import React , {useState, useEffect} from "react";
import { Box, useTheme, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Header from "../../components/Header";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

export default function FAQ({faqData}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [faq , setFaq] = useState(null)


  useEffect(() => {
    if(faqData){
      setFaq(faqData);
      console.log("setFaq: " + faq);
    }

  },[faqData])


  return (
    <Box m="20px">
      <Header title={"FAQ"} subtitle={"Frequently Asked Questions"} />
      {faq && faq.map((item)=>{
        return(
        <Accordion defaultExpanded={false}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.green[400]} variant="h5">
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {item.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
        );
      })}
      
    </Box>
  );
}
