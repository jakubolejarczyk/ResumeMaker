using API.Sources.Responses;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace API.Sources.Services;


public interface IResumePdfService
{
    byte[] Generate(ResumeResponse resume);
}



public class ResumePdfService : IResumePdfService
{

    private static readonly string Dark = "#111827";
    private static readonly string Gray = "#6B7280";
    private static readonly string Accent = "#2563EB";


    public byte[] Generate(ResumeResponse resume)
    {

        var document = Document.Create(container =>
        {

            container.Page(page =>
            {

                page.Size(PageSizes.A4);
                page.Margin(0);

                page.DefaultTextStyle(x =>
                    x.FontFamily("Arial")
                    .FontSize(10)
                );


                page.Content()
                .Row(row =>
                {


                    /*
                     * LEFT SIDEBAR
                     */

                    row.ConstantItem(190)
                    .Background(Dark)
                    .Padding(25)
                    .Column(side =>
                    {


                        side.Spacing(18);



                        side.Item()
                        .Text(resume.Name)
                        .FontSize(22)
                        .Bold()
                        .FontColor(Colors.White);



                        side.Item()
                        .Text(resume.JobTitle)
                        .FontSize(12)
                        .FontColor("#CBD5E1");



                        side.Item()
                        .PaddingTop(20)
                        .Text("KONTAKT")
                        .FontSize(11)
                        .Bold()
                        .FontColor("#93C5FD");



                        foreach (var social in resume.SocialMedias.OrderBy(x => x.Order))
                        {

                            side.Item()
                            .Text($"{social.Label}\n{social.Link}")
                            .FontSize(9)
                            .FontColor(Colors.White);

                        }





                        side.Item()
                        .PaddingTop(20)
                        .Text("UMIEJĘTNOŚCI")
                        .FontSize(11)
                        .Bold()
                        .FontColor("#93C5FD");



                        foreach (var group in resume.SkillGroups.OrderBy(x => x.Order))
                        {

                            side.Item()
                            .PaddingTop(8)
                            .Text(group.Name.ToUpper())
                            .FontSize(9)
                            .Bold()
                            .FontColor("#CBD5E1");



                            foreach (var skill in group.SkillElements.OrderBy(x => x.Order))
                            {

                                side.Item()
                                .Text($"• {skill.Name}")
                                .FontSize(9)
                                .FontColor(Colors.White);

                            }

                        }







                        side.Item()
                        .PaddingTop(20)
                        .Text("EDUKACJA")
                        .FontSize(11)
                        .Bold()
                        .FontColor("#93C5FD");



                        foreach (var edu in resume.Educations.OrderBy(x => x.Order))
                        {

                            side.Item()
                            .PaddingTop(8)
                            .Text(edu.Degree)
                            .Bold()
                            .FontColor(Colors.White);



                            side.Item()
                            .Text(edu.FieldOfStudy)
                            .FontColor("#CBD5E1");



                            side.Item()
                            .Text($"{edu.InstitutionName} ({edu.GraduationYear})")
                            .FontSize(8)
                            .FontColor("#CBD5E1");

                        }

                    });






                    /*
                     * MAIN CONTENT
                     */


                    row.RelativeItem()
                    .Padding(35)
                    .Column(main =>
                    {


                        main.Spacing(20);



                        SectionTitle(main, "PROFIL");


                        main.Item()
                        .Text(resume.Description)
                        .FontSize(11)
                        .LineHeight(1.4f)
                        .FontColor(Gray);







                        SectionTitle(main, "DOŚWIADCZENIE");



                        foreach (var exp in resume.Experiences.OrderBy(x => x.Order))
                        {

                            main.Item()
                            .PaddingTop(10)
                            .Column(card =>
                            {

                                card.Item()
                                .Text(exp.JobTitle)
                                .FontSize(14)
                                .Bold()
                                .FontColor(Dark);



                                card.Item()
                                .Text(exp.CompanyName)
                                .FontSize(11)
                                .FontColor(Accent);



                                card.Item()
                                .Text(
                                    $"{exp.StartDate:yyyy} - {(exp.EndDate.HasValue ? exp.EndDate.Value.ToString("yyyy") : "Obecnie")}"
                                )
                                .FontSize(9)
                                .FontColor(Gray);



                                foreach (var desc in exp.ExperienceDescriptions.OrderBy(x => x.Order))
                                {

                                    card.Item()
                                    .PaddingTop(4)
                                    .Text($"• {desc.Description}")
                                    .FontSize(10);

                                }

                            });


                        }








                    });



                });


            });


        });



        return document.GeneratePdf();

    }






    private void SectionTitle(ColumnDescriptor column, string title)
    {

        column.Item()
        .PaddingBottom(5)
        .Text(title)
        .FontSize(13)
        .Bold()
        .FontColor(Accent);


        column.Item()
        .LineHorizontal(1)
        .LineColor("#E5E7EB");

    }

}