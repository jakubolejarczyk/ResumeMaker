using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using ResumeMakerApi.Source.Dtos;

namespace ResumeMakerApi.Source.Builders;

public class ResumeBuilder : IResumeBuilder
{
    public byte[] Build(ResumeDto resumeDto)
    {
        using var stream = new MemoryStream();

        Document
            .Create(container => CreateResumePage(container, resumeDto))
            .GeneratePdf(stream);

        return stream.ToArray();
    }


    private IDocumentContainer CreateResumePage(
        IDocumentContainer container,
        ResumeDto resumeDto)
    {
        return container.Page(page =>
        {
            page.Size(PageSizes.A4);
            page.Margin(35);

            page.DefaultTextStyle(x =>
                x.FontFamily("Arial")
                 .FontSize(10));


            page.Content()
            .Row(row =>
            {

                row.ConstantItem(160)
                .Column(column =>
                {
                    BuildContact(column, resumeDto);

                    column.Spacing(10);

                    BuildSkills(column, resumeDto);

                    column.Spacing(10);

                    BuildSocialMedia(column, resumeDto);
                });


                row.ConstantItem(20);

                row.RelativeItem()
                .Column(column =>
                {
                    BuildHeader(column, resumeDto);

                    column.Spacing(10);

                    BuildExperience(column, resumeDto);

                    column.Spacing(10);

                    BuildEducation(column, resumeDto);
                });

            });

        });
    }



    private void BuildHeader(
        ColumnDescriptor column,
        ResumeDto dto)
    {

        column.Item()
            .Text($"{dto.User.FirstName} {dto.User.LastName}")
            .FontSize(26)
            .Bold()
            .FontColor("#111827");


        column.Item()
            .Text(dto.Resume.JobTitle)
            .FontSize(14)
            .FontColor("#2563EB");


        column.Item()
            .PaddingTop(15)
            .LineHorizontal(1)
            .LineColor("#E5E7EB");
    }



    private void BuildContact(
        ColumnDescriptor column,
        ResumeDto dto)
    {

        SectionTitle(column, "CONTACT");


        column.Item()
            .Text(dto.User.Email);


        column.Item()
            .Text($"+{dto.User.CountryCode} {dto.User.PhoneNumber}");


        column.Item()
            .Text($"{dto.Resume.City}, {dto.Resume.Country}");
    }



    private void BuildSkills(
    ColumnDescriptor column,
    ResumeDto dto)
    {
        SectionTitle(column, "SKILLS");


        foreach (var group in dto.SkillGroups)
        {
            column.Item()
                .PaddingBottom(2)
                .Text(group.Title)
                .Bold()
                .FontSize(9);


            column.Item()
                .PaddingBottom(4)
                .Text(
                    string.Join(
                        " • ",
                        group.SkillElements.Select(x => x.Name)
                    )
                )
                .FontSize(8);
        }
    }



    private void BuildSocialMedia(
        ColumnDescriptor column,
        ResumeDto dto)
    {

        SectionTitle(column, "LINKS");


        foreach (var social in dto.SocialMedias)
        {
            column.Item()
                .Text($"{social.Label}:")
                .Bold();


            column.Item()
                .Text(social.Link)
                .FontSize(9);
        }
    }



    private void BuildExperience(
        ColumnDescriptor column,
        ResumeDto dto)
    {

        SectionTitle(column, "EXPERIENCE");


        foreach (var exp in dto.Experiences)
        {

            column.Item()
            .PaddingBottom(10)
            .Column(item =>
            {

                item.Item()
                .Text(exp.JobTitle)
                .Bold()
                .FontSize(13);


                item.Item()
                .Text(exp.CompanyName)
                .FontColor("#2563EB");


                item.Item()
                .Text(
                    $"{exp.StartDate:MMM yyyy} - " +
                    $"{(exp.EndDate.HasValue
                        ? exp.EndDate.Value.ToString("MMM yyyy")
                        : "Present")}"
                )
                .FontSize(9)
                .FontColor("#6B7280");


                foreach (var description
                    in exp.ExperienceDescriptions)
                {

                    item.Item()
                    .Text($"• {description.Description}");

                }

            });
        }
    }



    private void BuildEducation(
        ColumnDescriptor column,
        ResumeDto dto)
    {

        SectionTitle(column, "EDUCATION");


        foreach (var edu in dto.Educations)
        {

            column.Item()
            .Text(edu.Degree)
            .Bold();


            column.Item()
            .Text(edu.FieldOfStudy);


            column.Item()
            .Text(
                $"{edu.InstitutionName}, {edu.GraduationYear}"
            )
            .FontSize(9)
            .FontColor("#6B7280");

        }
    }



    private void SectionTitle(
        ColumnDescriptor column,
        string title)
    {

        column.Item()
            .Text(title)
            .FontSize(10)
            .Bold()
            .FontColor("#2563EB");

    }
}