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

# Admin Dashboard

The Admin Dashboard should provide full management/control over the Mega Event.

An admin should be able to create, edit, and delete the entities and data exposed by the admin APIs.

The admin UI should NOT be designed as a read-only dashboard.

## Admin Capabilities

### Mega Events

Admin can:

- Create Mega Events
- Edit Mega Event name
- Edit description
- Edit registration start/end times
- Delete Mega Events

---

### SIGs

Admin can:

- Create SIGs
- Edit SIG names
- Edit SIG descriptions
- Delete SIGs

---

### Events

Admin can:

- Create Events
- Assign an Event to a Mega Event
- Assign an Event to a SIG
- Edit Event name
- Edit Event description
- Change its associated SIG/Mega Event
- Delete Events

---

### Rounds

Admin can:

- Create rounds inside an Event
- Set round number
- Set round name
- Set round description
- Set maximum points
- Edit rounds
- Delete rounds

---

### Teams

Admin can:

- Create teams
- Edit team codes
- Delete teams
- View team members
- Add participants to teams
- Remove participants from teams

---

### Leaderboards

Admin must have direct control over both leaderboard types.

#### Round Leaderboard

Admin can:

- Add teams
- Set points
- Set rank
- Edit points
- Edit rank
- Replace/update the leaderboard

#### Overall Mega Event Leaderboard

Admin can:

- Add teams
- Set points
- Set rank
- Edit points
- Edit rank
- Replace/update the leaderboard

The overall leaderboard must be treated as an independent leaderboard.
It must NOT be automatically calculated from round scores.

---

### Tally Registrations

Admin can:

- View registrations submitted through Tally
- Search/filter registrations where supported
- View participant registration details

Registration data itself remains managed by Tally.

---

### Audit Logs

Admin can:

- View audit logs
- See what action was performed
- See which entity was affected
- See who performed the action
- See old/new data where available
- Filter audit logs where supported

---

# Admin UX Requirements

The admin dashboard should make it possible to manage the entire event without needing direct database access. There is no theme and should not be visible to participants.

For example:

```text
Admin Dashboard
│
├── Mega Events
│   ├── Create
│   ├── Edit
│   └── Delete
│
├── SIGs
│   ├── Create
│   ├── Edit
│   └── Delete
│
├── Events
│   ├── Create
│   ├── Edit
│   └── Delete
│
├── Rounds
│   ├── Create
│   ├── Edit
│   └── Delete
│
├── Teams
│   ├── Create
│   ├── Edit
│   ├── Delete
│   └── Manage Members
│
├── Leaderboards
│   ├── Round Leaderboards
│   └── Overall Leaderboard
│
├── Registrations
│   └── Tally Submissions
│
└── Audit Logs
```

