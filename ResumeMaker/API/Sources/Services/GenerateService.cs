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
    private const string SidebarBg = "#F8FAFC";
    private const string TextBlack = "#0F172A";
    private const string TextDarkGray = "#334155";
    private const string TextMediumGray = "#64748B";
    private const string SidebarText = "#1E293B";
    private const string LineColor = "#E2E8F0";
    private const string TagBgColor = "#E2E8F0";

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
                page.Margin(0);
                page.Background().Row(row =>
                {
                    row.ConstantItem(230).ExtendVertical().Background(SidebarBg);
                    row.RelativeItem().ExtendVertical().Background(Colors.White);
                });
                page.DefaultTextStyle(style => style
                    .FontFamily(Fonts.Arial)
                    .FontSize(10)
                    .FontColor(TextDarkGray)
                );
                page.Content().Row(row =>
                {
                    row.ConstantItem(230)
                        .PaddingVertical(40)
                        .PaddingHorizontal(30)
                        .Column(sidebar => BuildSidebar(sidebar, user, resume));
                    row.RelativeItem()
                        .PaddingVertical(40)
                        .PaddingHorizontal(40)
                        .Column(main => BuildMainContent(main, user, resume));
                });
                page.Footer().Row(row =>
                {
                    row.ConstantItem(230);
                    row.RelativeItem()
                        .PaddingHorizontal(40)
                        .PaddingBottom(20)
                        .Element(footer => BuildConsentSection(footer, company));
                });
            });
        });
    }

    private void BuildSidebar(ColumnDescriptor column, User user, Resume resume)
    {
        BuildContactSection(column, user);
        BuildSocialSection(column, resume);
        BuildSkillsSection(column, resume);
    }

    private void BuildContactSection(ColumnDescriptor column, User user)
    {
        AddSidebarTitle(column, "KONTAKT");
        column.Item().PaddingBottom(8).Text(user.Email).FontColor(SidebarText);
        column.Item().PaddingBottom(8).Text(user.PhoneNumber).FontColor(SidebarText);
        column.Item().PaddingBottom(25).Text($"{user.City}, {user.Country}").FontColor(TextMediumGray);
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
                item.Item().PaddingTop(2).Text(social.Link).FontSize(9).FontColor(TextMediumGray);
            });
        }
        column.Item().PaddingBottom(15);
    }

    private void BuildSkillsSection(ColumnDescriptor column, Resume resume)
    {
        if (resume.SkillGroups is not { Count: > 0 }) return;
        AddSidebarTitle(column, "UMIEJĘTNOŚCI");
        foreach (var group in resume.SkillGroups.OrderBy(x => x.Order))
        {
            column.Item().PaddingBottom(8).Text(group.Name.ToUpper())
                .FontSize(9)
                .Bold()
                .FontColor(TextBlack)
                .LetterSpacing(0.05f);
            if (group.SkillElements != null && group.SkillElements.Count > 0)
            {
                column.Item().PaddingBottom(15).Inlined(inlined =>
                {
                    inlined.Spacing(6);
                    foreach (var skill in group.SkillElements.OrderBy(x => x.Order))
                    {
                        inlined.Item()
                            .Background(TagBgColor)
                            .PaddingVertical(4)
                            .PaddingHorizontal(10)
                            .Text(skill.Name)
                            .FontSize(9)
                            .SemiBold()
                            .FontColor(TextBlack);
                    }
                });
            }
        }
    }

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
            .FontSize(32)
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
    }

    private void BuildProfileSection(ColumnDescriptor column, Resume resume)
    {
        if (string.IsNullOrWhiteSpace(resume.Description)) return;
        AddMainSectionTitle(column, "PROFIL ZAWODOWY");
        column.Item().PaddingBottom(25).Text(resume.Description)
            .FontSize(10)
            .LineHeight(1.5f);
    }

    private void BuildExperienceSection(ColumnDescriptor column, Resume resume)
    {
        if (resume.Experiences is not { Count: > 0 }) return;
        AddMainSectionTitle(column, "DOŚWIADCZENIE ZAWODOWE");
        foreach (var experience in resume.Experiences.OrderBy(x => x.Order))
        {
            column.Item().PaddingBottom(20).Column(item =>
            {
                item.Item().Row(row =>
                {
                    row.RelativeItem().Text(experience.JobTitle).FontSize(11).Bold().FontColor(TextBlack);
                    var endDate = experience.EndDate.HasValue ? experience.EndDate.Value.ToString("MM.yyyy") : "Obecnie";
                    var dateText = $"{experience.StartDate:MM.yyyy} – {endDate}";
                    row.ConstantItem(130).AlignRight().Text(dateText).FontSize(9.5f).FontColor(TextMediumGray).SemiBold();
                });
                item.Item().PaddingBottom(8).Text(experience.CompanyName).FontSize(10.5f).Italic().FontColor(TextMediumGray);
                if (experience.ExperienceDescriptions != null)
                {
                    foreach (var desc in experience.ExperienceDescriptions.OrderBy(x => x.Order))
                    {
                        item.Item().PaddingTop(4).Row(row =>
                        {
                            row.ConstantItem(15).Text("•").FontColor(TextMediumGray);
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
            column.Item().PaddingBottom(15).Column(item =>
            {
                item.Item().Row(row =>
                {
                    row.RelativeItem().Text(education.Degree).FontSize(11).Bold().FontColor(TextBlack);
                    row.ConstantItem(60).AlignRight().Text(education.GraduationYear.ToString()).FontSize(9.5f).FontColor(TextMediumGray).SemiBold();
                });
                item.Item().PaddingTop(2).Text(education.InstitutionName).Italic().FontColor(TextMediumGray);
                if (!string.IsNullOrWhiteSpace(education.FieldOfStudy))
                {
                    item.Item().PaddingTop(2).Text(education.FieldOfStudy).FontSize(9.5f);
                }
            });
        }
    }

    private void BuildConsentSection(IContainer container, Company company)
    {
        if (!company.IncludeConsentClause) return;
        var consent = string.IsNullOrWhiteSpace(company.CustomConsentClause)
            ? "Wyrażam zgodę na przetwarzanie moich danych osobowych zawartych w niniejszym CV dla potrzeb niezbędnych do realizacji procesu rekrutacji zgodnie z obowiązującymi przepisami prawa."
            : company.CustomConsentClause;
        container
            .Text(consent)
            .FontSize(7.5f)
            .FontColor("#94A3B8")
            .LineHeight(1.3f)
            .AlignLeft();
    }

    private void AddSidebarTitle(ColumnDescriptor column, string title)
    {
        column.Item()
            .PaddingBottom(15)
            .Text(title)
            .FontSize(11)
            .Bold()
            .LetterSpacing(0.05f)
            .FontColor(TextBlack);
    }

    private void AddMainSectionTitle(ColumnDescriptor column, string title)
    {
        column.Item()
            .PaddingBottom(8)
            .BorderBottom(1)
            .BorderColor(LineColor)
            .PaddingBottom(6)
            .Text(title)
            .FontSize(12)
            .Bold()
            .LetterSpacing(0.05f)
            .FontColor(TextBlack);
        column.Item().Height(10);
    }
}