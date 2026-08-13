# Asset Library Roadmap (Parametric Recreation)

Instead of manually converting 500+ legacy binary `.dwg` files, we will algorithmically recreate these assets as pure, parametric TypeScript functions.

## Why this approach is better:
1. **Zero Copyright Risk**: By generating the vector geometry from scratch using math and code, we completely bypass any intellectual property or licensing issues attached to the legacy `.dwg` files.
2. **Infinite Customization**: Instead of having 50 static "Door" blocks for different sizes, we have one `exportDoorDXF({ width, height })` function that can generate *any* size dynamically.
3. **Lightweight**: We don't need to ship megabytes of binary CAD files in the web application.

---

## 📅 Roadmap: Programmatic Asset Categories

### Phase 1: Architectural Openings (In Progress)
- [x] Standard Door (Single Swing)
- [x] Standard Window (Fixed Glass)
- [ ] Double Swing Doors
- [ ] Sliding Glass Doors
- [ ] Garage / Roller Doors

### Phase 2: Structural & Drafting Annotations
- [x] North Arrow Symbol
- [ ] Section Markers & Callouts
- [ ] Elevation Targets
- [ ] Revision Clouds
- [ ] Grid Line Bubbles (Dynamic text insertion)

### Phase 3: Furniture & Plumbing (Parametric)
- [ ] Standard Desk (Parametric width/depth)
- [ ] Conference Table (Parametric seating)
- [ ] Toilet / Water Closet (Standard plan view)
- [ ] Sinks & Basins (Single and double)

### Phase 4: Landscaping & Site (Algorithmic)
- [ ] Trees (Algorithmic fractal branching in plan view)
- [ ] Shrubs & Hedges
- [ ] Parking Bays (Parametric array generator)
- [ ] Standard Vehicles (Simplified 2D bounding geometries)

### Phase 5: Electrical & Mechanical Symbols
- [ ] Light Fixtures (Ceiling, Wall, Spots)
- [ ] Sockets & Switches
- [ ] Distribution Boards (DB)
- [ ] HVAC Vents & Returns
