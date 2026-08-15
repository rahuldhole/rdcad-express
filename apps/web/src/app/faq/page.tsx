"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { 
  Box, Typography, Button, Container, Accordion, AccordionSummary, AccordionDetails, Card, CardContent 
} from "@mui/material";

const faqs = [
  {
    question: "How do I use the 'Copy CAD Command' feature?",
    answer: "The 'Copy CAD Command' feature allows you to instantly generate structural detailing within your CAD software. Once you have configured your design in the web app, simply click the copy icon button. Then, switch to AutoCAD (or any compatible CAD software with LISP support), paste the copied text directly into the command line, and press Enter. The script will automatically draw the exact element."
  },
  {
    question: "What is RDCAD Express?",
    answer: "RDCAD Express is an open-source suite of engineering tools designed to automate structural detailing, generate Bar Bending Schedules (BBS), and export precise DXF drawings directly from your browser."
  },
  {
    question: "Can I export drawings as DXF files?",
    answer: "Yes! Every module (Beams, Columns, Slabs, etc.) includes an 'Export DXF' button. Clicking this will instantly download a .dxf file of your design, which you can open in any standard CAD software."
  },
  {
    question: "Is RDCAD Express completely free and open-source?",
    answer: "Absolutely. RDCAD Express is a community-driven, open-source project. You can use it for free, inspect the code, and even contribute to its development on GitHub."
  },
  {
    question: "Does it work without an internet connection?",
    answer: "Yes, RDCAD Express is a Progressive Web App (PWA). Once installed or loaded in your browser, the core mathematical engine and DXF generation work completely offline."
  }
];

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', pb: 12 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Background decorations */}
      <Box sx={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', borderRadius: '50%', bgcolor: 'primary.main', opacity: 0.05, filter: 'blur(100px)', pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', borderRadius: '50%', bgcolor: 'success.main', opacity: 0.05, filter: 'blur(100px)', pointerEvents: 'none' }} />

      <Container maxWidth="md" sx={{ pt: 12, position: 'relative', zIndex: 10 }}>
        <Button 
          component={Link} 
          href="/" 
          startIcon={<ArrowLeft size={16} />}
          color="inherit"
          sx={{ mb: 4, color: 'text.secondary', '&:hover': { color: 'text.primary', bgcolor: 'transparent' } }}
        >
          Back to Home
        </Button>
        
        <Typography variant="h3" component="h1"  sx={{ fontWeight: 'extrabold',  mb: 2 }}>
          Frequently Asked <Typography component="span" variant="h3"  color="primary.main" sx={{ fontWeight: 'extrabold' }}>Questions</Typography>
        </Typography>
        
        <Typography variant="h6" color="text.secondary" sx={{ mb: 6, fontWeight: 'normal' }}>
          Everything you need to know about using RDCAD Express to its full potential.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {faqs.map((faq, idx) => (
            <Accordion key={idx} variant="outlined" sx={{ borderRadius: 2, '&:before': { display: 'none' } }}>
              <AccordionSummary
                expandIcon={<ChevronDown size={20} />}
                sx={{ p: 3, '& .MuiAccordionSummary-content': { my: 0 } }}
              >
                <Typography variant="h6"  sx={{ fontWeight: 'bold' }}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        
        <Card variant="outlined" sx={{ mt: 8, textAlign: 'center', p: { xs: 4, md: 6 }, borderRadius: 4, boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h5"  sx={{ fontWeight: 'bold',  mb: 2 }}>
              Still have questions?
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Read our step-by-step startup guide to learn the workflow in detail.
            </Typography>
            <Button 
              component={Link} 
              href="/guide" 
              variant="contained" 
              size="large"
              color="primary"
              sx={{ borderRadius: 8, px: 4, py: 1.5 }}
            >
              Read Startup Guide
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
