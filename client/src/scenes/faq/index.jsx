import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Header from "../../components/Header";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

export default function FAQ() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title={"FAQ"} subtitle={"Frequently Asked Questions"} />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.green[400]} variant="h5">
            An Important Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
             "Buéda texto super mega importantissimo que revela uma questão
            bastante intrigante, diga-se de passagem, por acaso até discordo mas a
            culpa não é tua, é de quem se revelou quando não tinha nada que se
            revelar" Exclamou o mordomo
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.green[400]} variant="h5">
            Another Important Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
             "Buéda texto super mega importantissimo que revela uma questão
            bastante intrigante, diga-se de passagem, por acaso até discordo mas a
            culpa não é tua, é de quem se revelou quando não tinha nada que se
            revelar" Exclamou o mordomo
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.green[400]} variant="h5">
            Your favourite Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            "Buéda texto super mega importantissimo que revela uma questão
            bastante intrigante, diga-se de passagem, por acaso até discordo mas a
            culpa não é tua, é de quem se revelou quando não tinha nada que se
            revelar" Exclamou o mordomo
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.green[400]} variant="h5">
            The final one
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            O que é ser quando nada se é? nunca saberei se não abraçar o
            conceito de morte e vida num só dia, sem a noite
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
