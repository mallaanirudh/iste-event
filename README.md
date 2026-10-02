# Frontend Development Guidelines

This document defines the functional requirements and development guidelines for the Mega Event frontend.

The frontend team is free to decide the **visual design, colors, typography, layouts, animations, and overall UI style**. However, the functionality, API contracts, data hierarchy, and role boundaries described below must be followed.

---

## 1. Application Structure

The application has two primary experiences:

### Public / Participant

Participants should be able to:

- View Mega Events
- View Events
- View Event details
- View Rounds
- View Round details
- View Round Leaderboards
- View Overall Mega Event Leaderboards
- Register through the embedded Tally form

### Admin

Admins should be able to:

- Login
- Manage Mega Events
- Manage SIGs
- Manage Events
- Manage Rounds
- Manage Teams
- Manage Team Members
- Manage Round Leaderboards
- Manage Overall Mega Event Leaderboards
- View Tally registrations
- View Audit Logs

---

# 2. Data Hierarchy

The UI should reflect the following structure:

```text
Mega Event
│
├── SIG
│   ├── Event
│   │   ├── Round 1
│   │   ├── Round 2
│   │   └── ...
│   │
│   └── Event
│       └── ...
│
├── SIG
│   └── Event
│       └── ...
│
└── ...
```


# See The endpoints in Routes.md and for further info see docs.md
