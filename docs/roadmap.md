# rdcad-express Roadmap

This document outlines the milestones and progress for fully replacing the legacy CAD plugin with a modern, web-first local application.

## 🟢 Milestone 1: Bar Bending Schedule (BBS) Generator
*Status: Completed*
- [x] Extract legacy CAD table schemas to TypeScript interfaces
- [x] Implement core engineering math (`core-math`) for rebar weight and bend deductions
- [x] Build interactive, parametric data grid for BBS data entry
- [x] Setup modern Next.js architecture with Tailwind CSS

## 🟢 Milestone 2: Beam & Column Detailing Modules
*Status: Completed*
- [x] Implement parametric forms for beam and column dimensions/reinforcement
- [x] Build a live 2D preview engine using HTML5 Canvas (`konva.js` or `fabric.js`)
- [x] Develop the DXF Vector Generator to export native `.dxf` CAD files
- [x] Integrate DXF exporting with the UI

## 🟡 Milestone 3: Sequential Renumbering & Grid Utilities
*Status: In Progress*
- [ ] Interactive canvas tool to place and auto-number elements (e.g. B1, B2)
- [ ] Find & Replace prefix/suffix tools for drawing labels

## ⚪ Milestone 4: Slab & Foundation Modules
*Status: Planned*
- [ ] 1-Way and 2-Way slab rebar calculator and schedule generator
- [ ] Isolated footing & pile cap parametric section generator

## ⚪ Milestone 5: Specialized Structural Tanks (Water Tanks)
*Status: Planned*
- [ ] Rectangular and Circular underground tank sections
- [ ] Overhead water tank section generators
