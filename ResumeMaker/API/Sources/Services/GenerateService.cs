using API.Sources.Entities;
using API.Sources.Repositories;
using Microsoft.AspNetCore.Mvc;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace API.Sources.Services;

public class GenerateService(
    IUserRepository userRepository,
    ICompanyRepository companyRepository,
    IResumeRepository resumeRepository
) : IGenerateService
{
    // Profesjonalna paleta - Szarości, Biel i Czerń
    private const string SidebarBg = "#F3F4F6";      // Jasnoszary pasek boczny (Gray 100)
    private const string TextBlack = "#111827";      // Prawie czarny (główne nagłówki i imię)
    private const string TextDarkGray = "#374151";   // Ciemnoszary (główny tekst)
    private const string TextMediumGray = "#6B7280"; // Średnioszary (daty, nazwy firm)
    private const string SidebarText = "#1F2937";    // Tekst na pasku bocznym
    private const string LineColor = "#E5E7EB";      // Subtelna linia oddzielająca

    public FileContentResult Generate(int userId, int companyId, int resumeId)
    {
        var userResponse = userRepository.Read(userId);
        var companyResponse = companyRepository.Read(companyId);
        var resumeResponse = resumeRepository.Read(resumeId);

        if (!userResponse.Success || userResponse.Body == null)
            throw new InvalidOperationException($"Błąd User: {userResponse.Message}");

        if (!companyResponse.Success || companyResponse.Body == null)
            throw new InvalidOperationException($"Błąd Company: {companyResponse.Message}");

        if (!resumeResponse.Success || resumeResponse.Body == null)
            throw new InvalidOperationException($"Błąd Resume: {resumeResponse.Message}");

        var document = BuildDocument(userResponse.Body, companyResponse.Body, resumeResponse.Body);
        var pdf = document.GeneratePdf();

        return new FileContentResult(pdf, "application/pdf")
        {
            FileDownloadName = $"cv-{userResponse.Body.FirstName.ToLower()}-{userResponse.Body.LastName.ToLower()}.pdf"
        };
    }

    private Document BuildDocument(User user, Company company, Resume resume)
    {
        return Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                // Zero marginesów, aby tło paska mogło dotykać krawędzi kartki.
                // Odstępy (paddingi) realizujemy wewnątrz kolumn.
                page.Margin(0);

                // 1. TŁO DOKUMENTU - Ustawione globalnie, by pasek ciągnął się do samego dołu
                page.Background().Row(row =>
                {
                    row.ConstantItem(220).ExtendVertical().Background(SidebarBg);
                    row.RelativeItem().ExtendVertical().Background(Colors.White);
                });

                page.DefaultTextStyle(style => style
                    .FontFamily(Fonts.Arial)
                    .FontSize(10)
                    .FontColor(TextDarkGray)
                );

                // 2. GŁÓWNA ZAWARTOŚĆ
                page.Content().Row(row =>
                {
                    // Lewa kolumna - Pasek Boczny
                    row.ConstantItem(220)
                        .PaddingVertical(40)
                        .PaddingHorizontal(25)
                        .Column(sidebar => BuildSidebar(sidebar, user, resume));

                    // Prawa kolumna - Główna Treść
                    row.RelativeItem()
                        .PaddingVertical(40)
                        .PaddingHorizontal(35)
                        .Column(main => BuildMainContent(main, user, resume));
                });

                // 3. STOPKA (Klauzula RODO)
                page.Footer().Row(row =>
                {
                    row.ConstantItem(220); // Zostawiamy puste miejsce pod paskiem bocznym
                    row.RelativeItem()
                        .PaddingHorizontal(35)
                        .PaddingBottom(20) // Odstęp od samego dołu kartki
                        .Element(footer => BuildConsentSection(footer, company));
                });
            });
        });
    }

    // --- LEWA KOLUMNA (Pasek Boczny) ---

    private void BuildSidebar(ColumnDescriptor column, User user, Resume resume)
    {
        BuildContactSection(column, user);
        BuildSocialSection(column, resume);
        BuildSkillsSection(column, resume);
    }

    private void BuildContactSection(ColumnDescriptor column, User user)
    {
        AddSidebarTitle(column, "KONTAKT");

        column.Item().PaddingBottom(6).Text(user.Email).FontColor(SidebarText);
        column.Item().PaddingBottom(6).Text(user.PhoneNumber).FontColor(SidebarText);
        column.Item().PaddingBottom(20).Text($"{user.City}, {user.Country}").FontColor(TextMediumGray);
    }

    private void BuildSocialSection(ColumnDescriptor column, Resume resume)
    {
        if (resume.SocialMedias is not { Count: > 0 }) return;

        AddSidebarTitle(column, "LINKI");

        foreach (var social in resume.SocialMedias.OrderBy(x => x.Order))
        {
            column.Item().PaddingBottom(12).Column(item =>
            {
                item.Item().Text(social.Label).Bold().FontColor(SidebarText);
                item.Item().PaddingTop(1).Text(social.Link).FontSize(9).FontColor(TextMediumGray);
            });
        }
        column.Item().PaddingBottom(8); // Dodatkowy odstęp przed kolejną sekcją
    }

    private void BuildSkillsSection(ColumnDescriptor column, Resume resume)
    {
        if (resume.SkillGroups is not { Count: > 0 }) return;

        AddSidebarTitle(column, "UMIEJĘTNOŚCI");

        foreach (var group in resume.SkillGroups.OrderBy(x => x.Order))
        {
            column.Item().PaddingTop(4).PaddingBottom(4).Text(group.Name.ToUpper())
                .FontSize(9)
                .Bold()
                .FontColor(TextBlack)
                .LetterSpacing(0.05f);

            if (group.SkillElements != null)
            {
                foreach (var skill in group.SkillElements.OrderBy(x => x.Order))
                {
                    column.Item().PaddingBottom(3).Text(skill.Name).FontColor(SidebarText);
                }
            }
            column.Item().PaddingBottom(8);
        }
    }

    // --- PRAWA KOLUMNA (Główna Treść) ---

    private void BuildMainContent(ColumnDescriptor column, User user, Resume resume)
    {
        BuildHeader(column, user, resume);

        column.Item().PaddingTop(25).Column(content =>
        {
            BuildProfileSection(content, resume);
            BuildExperienceSection(content, resume);
            BuildEducationSection(content, resume);
        });
    }

    private void BuildHeader(ColumnDescriptor column, User user, Resume resume)
    {
        column.Item().Text($"{user.FirstName} {user.LastName}")
            .FontSize(34) // Duże i wyraźne imię
            .Black()
            .FontColor(TextBlack);

        if (!string.IsNullOrWhiteSpace(resume.JobTitle))
        {
            column.Item().PaddingTop(4).Text(resume.JobTitle.ToUpper())
                .FontSize(12)
                .SemiBold()
                .LetterSpacing(0.1f)
                .FontColor(TextMediumGray);
        }

        // Subtelna linia pod nagłówkiem oddzielająca od reszty
        column.Item().PaddingTop(15).LineHorizontal(1).LineColor(LineColor);
    }

    private void BuildProfileSection(ColumnDescriptor column, Resume resume)
    {
        if (string.IsNullOrWhiteSpace(resume.Description)) return;

        AddMainSectionTitle(column, "PROFIL ZAWODOWY");

        column.Item().PaddingBottom(20).Text(resume.Description)
            .FontSize(10)
            .LineHeight(1.5f);
    }

    private void BuildExperienceSection(ColumnDescriptor column, Resume resume)
    {
        if (resume.Experiences is not { Count: > 0 }) return;

        AddMainSectionTitle(column, "DOŚWIADCZENIE ZAWODOWE");

        foreach (var experience in resume.Experiences.OrderBy(x => x.Order))
        {
            column.Item().PaddingBottom(18).Column(item =>
            {
                // Stanowisko i Daty w jednym wierszu
                item.Item().Row(row =>
                {
                    row.RelativeItem().Text(experience.JobTitle).FontSize(11.5f).Bold().FontColor(TextBlack);

                    var endDate = experience.EndDate.HasValue ? experience.EndDate.Value.ToString("MM.yyyy") : "Obecnie";
                    var dateText = $"{experience.StartDate:MM.yyyy} – {endDate}";

                    row.ConstantItem(120).AlignRight().Text(dateText).FontSize(9.5f).FontColor(TextMediumGray).SemiBold();
                });

                // Nazwa firmy
                item.Item().PaddingBottom(6).Text(experience.CompanyName).FontSize(10.5f).Italic().FontColor(TextMediumGray);

                // Obowiązki z wypunktowaniem
                if (experience.ExperienceDescriptions != null)
                {
                    foreach (var desc in experience.ExperienceDescriptions.OrderBy(x => x.Order))
                    {
                        item.Item().PaddingTop(3).Row(row =>
                        {
                            row.ConstantItem(12).Text("•").FontColor(TextMediumGray);
                            row.RelativeItem().Text(desc.Description).LineHeight(1.4f);
                        });
                    }
                }
            });
        }
    }

    private void BuildEducationSection(ColumnDescriptor column, Resume resume)
    {
        if (resume.Educations is not { Count: > 0 }) return;

        AddMainSectionTitle(column, "WYKSZTAŁCENIE");

        foreach (var education in resume.Educations.OrderBy(x => x.Order))
        {
            column.Item().PaddingBottom(12).Column(item =>
            {
                item.Item().Row(row =>
                {
                    row.RelativeItem().Text(education.Degree).FontSize(11).Bold().FontColor(TextBlack);
                    row.ConstantItem(50).AlignRight().Text(education.GraduationYear.ToString()).FontSize(9.5f).FontColor(TextMediumGray).SemiBold();
                });

                item.Item().PaddingTop(2).Text(education.InstitutionName).Italic().FontColor(TextMediumGray);

                if (!string.IsNullOrWhiteSpace(education.FieldOfStudy))
                {
                    item.Item().PaddingTop(2).Text(education.FieldOfStudy).FontSize(9.5f);
                }
            });
        }
    }

    // --- STOPKA (Klauzula RODO) ---

    private void BuildConsentSection(IContainer container, Company company)
    {
        if (!company.IncludeConsentClause) return;

        var consent = string.IsNullOrWhiteSpace(company.CustomConsentClause)
            ? "Wyrażam zgodę na przetwarzanie moich danych osobowych zawartych w niniejszym CV dla potrzeb niezbędnych do realizacji procesu rekrutacji zgodnie z obowiązującymi przepisami prawa."
            : company.CustomConsentClause;

        container
            .Text(consent)
            .FontSize(7.5f)
            .FontColor("#9CA3AF") // Jasnoszary
            .LineHeight(1.3f)
            .AlignCenter();
    }

    // --- ELEMENTY WIZUALNE WSPOMAGAJĄCE ---

    private void AddSidebarTitle(ColumnDescriptor column, string title)
    {
        column.Item()
            .PaddingBottom(10)
            .Text(title)
            .FontSize(11)
            .Bold()
            .LetterSpacing(0.05f)
            .FontColor(TextBlack);
    }

    private void AddMainSectionTitle(ColumnDescriptor column, string title)
    {
        column.Item()
            .PaddingBottom(5)
            .Text(title)
            .FontSize(13)
            .Bold()
            .LetterSpacing(0.05f)
            .FontColor(TextBlack);

        // Zrezygnowałem z kreski na rzecz pustego światła (częsty zabieg w pro CV)
        column.Item().Height(8);
    }
}