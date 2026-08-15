"use client";

import React, { useState, useMemo } from "react";
import { Plus, Trash2, Download, Table2, FileSpreadsheet } from "lucide-react";
import { calculateTotalWeight } from "@rdcad-express/core-math";
import type { RebarElement } from "@rdcad-express/dwg-schemas";
import * as XLSX from "xlsx";
import { 
  Box, Typography, TextField, Button, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, Stack, Card
} from "@mui/material";

export default function BBSGenerator() {
  const [rows, setRows] = useState<RebarElement[]>([
    {
      elementMark: "B1",
      shapeCode: "20",
      diameter: 16,
      numberOfMembers: 1,
      barsPerMember: 4,
      cuttingLength: 5.2,
      totalWeight: 0,
    },
  ]);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        elementMark: `B${rows.length + 1}`,
        shapeCode: "20",
        diameter: 12,
        numberOfMembers: 1,
        barsPerMember: 2,
        cuttingLength: 3.0,
        totalWeight: 0,
      },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof RebarElement, value: string | number) => {
    const newRows = [...rows];
    // @ts-expect-error Dynamic field assignment
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleExportCSV = () => {
    const headers = ["Mark", "Shape Code", "Diameter (mm)", "Members", "Bars/Member", "Cutting Length (m)", "Weight (kg)"];
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => {
        const weight = calculateTotalWeight(row.diameter, row.cuttingLength, row.numberOfMembers * row.barsPerMember);
        return [
          row.elementMark,
          row.shapeCode,
          row.diameter,
          row.numberOfMembers,
          row.barsPerMember,
          row.cuttingLength,
          weight.toFixed(2)
        ].join(",");
      })
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "bbs_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportExcel = () => {
    const data = rows.map(row => {
      const weight = calculateTotalWeight(row.diameter, row.cuttingLength, row.numberOfMembers * row.barsPerMember);
      return {
        "Mark": row.elementMark,
        "Shape Code": row.shapeCode,
        "Diameter (mm)": row.diameter,
        "Members": row.numberOfMembers,
        "Bars/Member": row.barsPerMember,
        "Cutting Length (m)": row.cuttingLength,
        "Weight (kg)": parseFloat(weight.toFixed(2))
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "BBS");
    
    // Auto-size columns
    const colWidths = [
      { wch: 10 }, { wch: 12 }, { wch: 15 }, 
      { wch: 10 }, { wch: 15 }, { wch: 20 }, { wch: 15 }
    ];
    worksheet["!cols"] = colWidths;

    XLSX.writeFile(workbook, "bbs_export.xlsx");
  };

  const totalTonnage = useMemo(() => {
    return rows.reduce((sum, row) => {
      const weight = calculateTotalWeight(row.diameter, row.cuttingLength, row.numberOfMembers * row.barsPerMember);
      return sum + weight;
    }, 0);
  }, [rows]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pt: { xs: 2, md: 2 } }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box sx={{ pb: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Table2 className="w-8 h-8 text-primary" />
            <Typography variant="h4" fontWeight="bold">Bar Bending Schedule</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Real-time parametric rebar weight calculations</Typography>
        </Box>

        <Card variant="outlined" sx={{ overflow: 'hidden' }}>
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 800 }} aria-label="BBS table">
              <TableHead sx={{ bgcolor: 'background.default' }}>
                <TableRow>
                  <TableCell>Mark</TableCell>
                  <TableCell>Shape</TableCell>
                  <TableCell>Dia (mm)</TableCell>
                  <TableCell>Members</TableCell>
                  <TableCell>Bars/Mem</TableCell>
                  <TableCell>Length (m)</TableCell>
                  <TableCell align="right">Weight (kg)</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, idx) => {
                  const calculatedWeight = calculateTotalWeight(row.diameter, row.cuttingLength, row.numberOfMembers * row.barsPerMember);
                  return (
                    <TableRow key={idx} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell>
                        <TextField 
                          value={row.elementMark} 
                          onChange={(e) => handleChange(idx, "elementMark", e.target.value)}
                          size="small"
                          sx={{ width: 100 }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField 
                          value={row.shapeCode} 
                          onChange={(e) => handleChange(idx, "shapeCode", e.target.value)}
                          size="small"
                          sx={{ width: 80 }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField 
                          type="number" 
                          value={row.diameter} 
                          onChange={(e) => handleChange(idx, "diameter", parseFloat(e.target.value) || 0)}
                          size="small"
                          sx={{ width: 90 }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField 
                          type="number" 
                          value={row.numberOfMembers} 
                          onChange={(e) => handleChange(idx, "numberOfMembers", parseFloat(e.target.value) || 0)}
                          size="small"
                          sx={{ width: 90 }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField 
                          type="number" 
                          value={row.barsPerMember} 
                          onChange={(e) => handleChange(idx, "barsPerMember", parseFloat(e.target.value) || 0)}
                          size="small"
                          sx={{ width: 90 }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField 
                          type="number" 
                          value={row.cuttingLength} 
                          onChange={(e) => handleChange(idx, "cuttingLength", parseFloat(e.target.value) || 0)}
                          size="small"
                          sx={{ width: 110 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="bold" color="success.main" fontFamily="monospace">
                          {calculatedWeight.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton 
                          onClick={() => handleRemoveRow(idx)}
                          color="error" 
                          size="small"
                        >
                          <Trash2 size={18} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ bgcolor: 'background.default', p: 3, borderTop: 1, borderColor: 'divider' }}>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2}>
              <Typography variant="caption" color="text.secondary">
                * Weight calculation is based on standard formula (D²/162.2) × L × Qty.
              </Typography>
              
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="body1" color="text.secondary">Total Steel Tonnage:</Typography>
                <Typography variant="h4" fontWeight="bold" color="success.main">
                  {(totalTonnage / 1000).toFixed(3)} <Typography component="span" variant="h6" color="success.light">MT</Typography>
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }} flexWrap="wrap">
              <Button 
                variant="outlined" 
                color="inherit"
                startIcon={<Download size={18} />}
                onClick={handleExportCSV}
              >
                Export CSV
              </Button>
              <Button 
                variant="outlined" 
                color="success"
                startIcon={<FileSpreadsheet size={18} />}
                onClick={handleExportExcel}
              >
                Export Excel
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<Plus size={18} />}
                onClick={handleAddRow}
              >
                Add Row
              </Button>
            </Stack>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
