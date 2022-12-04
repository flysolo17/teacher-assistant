import { Stack, Typography } from "@mui/material";

interface OverviewPageProps {}

const OverviewPage: React.FunctionComponent<OverviewPageProps> = () => {
  return (
    <Stack
      sx={{ width: "100%", textAlign: "center", padding: 3 }}
      direction={"column"}
      spacing={3}
    >
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: 700,
          fontStyle: "normal",
          fontSize: 40,
        }}
      >
        Overview
      </Typography>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: 400,
          textAlign: "justify",
          fontStyle: "normal",
          fontSize: 20,
        }}
      >
        Ang Kompyuter Asisted Instraksyon sa Asignaturang Filipino para sa
        Ikapitong Baitang ay idenesinyo upang pagtibayin at pagyamanin ang mga
        kasanayan sa pagaaral ng mga mag-aaral. Ang pag-aaral sa ating
        Asignaturang Filipino nang buo at integratibo na nagmumula sa pagbabasa,
        pag-aaral ng aralin at pagsusulit. Bahagi nito ang mga tanong na
        nangangalangan ng ibayong kasagutan na bibigyang diin ng bawat aralin sa
        Asignaturang Filipino para sa Ikapitong Baitang. Madaragdagan pa ang
        lubos mong pagkakatuto dahil sa iba’t ibang uri ng talakayan o uri ng
        panatikan na iyong matutunghayan sa bawat aralin. Kabahagi pa nito ang
        ilang pagsasanay sa bawat tanong ng aralin at sa iyong pag-unawa sa
        pagbasa. At ang marka o grado sa bawat assignatura ay nasusubaybayan ng
        iyong guro upang maging epektibo ang iyong napag-aralan.
      </Typography>
    </Stack>
  );
};

export default OverviewPage;
