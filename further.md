This document serves as the authoritative product, business logic, and user experience (UX) specification for the Mega Event Management Portal. It defines the system architecture, authentication workflows, user routing, scoring algorithms, and full operational guidelines for execution.

1. Event Master Metadata & Key Parameters

1.1 Event Timeline & Schedule

Kickoff All-SIG Meeting: September 15th (Event rules, documentation templates, and timeline shared)

SIG Submissions Deadline: By September 22nd (SIGs share event names, themes, number of rounds, and designated POCs)

Registration Window: Opens September 27th for both Scotland Yard and Square One

Second All-SIG Meeting: September 28th (Tentative - Event docs, procurement, and billing templates shared)

Publicity Campaign: September 28th - October 2nd (Classroom and hostel outreach)

Scotland Yard Event Date: October 11th

Square One Event Window: October 12th – October 16th

1.2 Logistics, Venues & Timings

Venue: TBD

Timings Window: 6:30 PM – 8:30 PM IST (Tentative)

Scheduling Format: Only one SIG event (both rounds, if applicable) scheduled per day, except for one overlapping day.

1.3 Communication & Contact Flow Hierarchy

All communication and operational escalations must follow a strict 3-tier hierarchy:

Tier 1 (Immediate Game Issues): Designated SIG Points of Contact (POCs).

Handles: Missing game materials, technical glitches, immediate rule/instruction clarifications at the venue.

Tier 2 (Team & Round Disputes): SIG Heads.

Handles: Rule-breaking allegations, round-level score disputes, local venue issues.

Tier 3 (Cross-SIG & Platform Issues): Events Coordinators.

Handles: Leaderboard anomalies, missing global points, cross-SIG schedule conflicts, final dispute appeals.

Guideline Standard: Participants and organizers must direct queries only to the designated POCs. Approaching unrelated SIG members or volunteers will lead to disqualification or conflicting information. Each SIG must nominate exactly 2 POCs via the designated Google Form.

2. Authentication, User Provisioning & Dynamic Routing

2.1 Authentication Rules & Policies

No Mandatory Email Verification Delay: Users (Participants, POCs, Admins) register with their Email and Password. Upon successful registration, they are immediately logged in and granted access to their respective portal routes without requiring email verification link confirmation.

Strict Password Policy (No Default Passwords Allowed):

Generic or hardcoded default passwords (e.g., password123, admin, 12345678) are strictly blocked at signup.

Passwords must be at least 8 characters long and include a mix of uppercase letters, lowercase letters, numbers, and at least one special character.

Separation of Portals (Players vs. Admins/POCs):

Participant Signup/Login (/login, /register): Used strictly by team leaders and players. Default role set to Participant.

Admin/POC Portal (/admin/login): Separate login interface reserved for SIG POCs, SIG Heads, and Events Coordinators using password credentials created by system admins.

2.2 Post-Login Redirection & Navigation Matrix

Upon authentication, the Next.js Middleware inspects the user's assigned role from user_roles and executes an immediate redirection:

                      [ User Login Attempt ]
                                │
                    [ Credentials Verified ]
                                │
                 ┌──────────────┴──────────────┐
                 ▼                             ▼
        Role = Participant            Role != Participant
                 │                             │
    Redirects to /dashboard          Inspect Specific Role:
                                       ├── Role: POC          ─► Redirect to /poc/scoring
                                       ├── Role: SIG Head     ─► Redirect to /poc/disputes
                                       └── Role: Admin / EC   ─► Redirect to /admin


Global Navigation Bar States Across Roles

User State

Navigation Menu Links Available

Unauthenticated

Schedule, Rules, Leaderboard, Register, Player Login, Staff Login

Participant

Dashboard (My Team & Pass), Schedule, Round Scores, Leaderboard, Logout

POC User

Fast Score Entry, Attendance Logger, Leaderboard, Logout

SIG Head

Score Review & Approval, Dispute Resolution Console, Leaderboard, Logout

Events Coordinator (Admin)

Admin Control Room, Auto-Grouping Pool, Leaderboard Snapshot Publisher, Audit Logs, Logout

3. Team Rules, Formation & Absence Logic

3.1 Registration Options

3-Member Team Registration:

One participant acts as Leader (Member 1) and inputs details for Member 2 and Member 3.

Upon submission, the system generates a custom unique #TEAM_ID (e.g., #TEAM042).

Individual (Solo) Registration:

Registrants who cannot form a full team register individually into the Unassigned Pool.

Individuals consent to automated organizer grouping and have no say in team composition.

3.2 Team Composition Rules

Exact Size: Every registered team must consist of exactly 3 members.

One Team Limit: A participant may belong to only one team across the entire Mega Event.

Roster Permanence: Once team IDs are assigned and published, team changes are strictly prohibited except under extraordinary circumstances approved directly by Events Coordinators.

Substitutions: Teams cannot substitute members independently. Unapproved substitutions lead to immediate team disqualification.

3.3 Absence, Duo Play, and Delay Management

Single Member Absence: If one member withdraws or is absent, organizers attempt to assign a replacement from the unassigned solo pool before the round starts.

Duo Play Mode (+2 Bonus): If no substitute is available, the team is allowed to play as a 2-member team. Playing as a duo automatically awards the team a +2 Duo Member Attendance Bonus for that specific round.

Full Team Absence: If all 3 members are absent for a round, the team receives 0 points. No re-attempts, catch-up rounds, or make-ups are permitted under any circumstances.

Late Arrival: If a team arrives late and disrupts the round by a significant duration, they are barred from participating in that round and awarded 0 points.

4. Master Scoring Engine & Calculation Rules

4.1 Master Score Formula

$$\text{Total Score} = \text{Square One Points} + \text{Scotland Yard Points} + \text{Bonus Points}$$

Maximum Total Aggregate Score: 100 Points

Scotland Yard Maximum: 20 Points

Square One Maximum: 60 Points

Bonus Points Maximum: 10 Points

4.2 Scotland Yard Scoring Breakout (Max 20 Points)

Ranking / Trigger

Base Points Awarded

Scotland Yard Winner (1st Place)

15 Points

Top 5 Teams (Ranks 2nd to 5th)

10 Points each

Top 10 Teams (Ranks 6th to 10th)

5 Points each

Bonus Riddles Solved

Up to 5 Points (Added to base score, capped at 20)

4.3 Square One Scoring Breakout (Max 60 Points)

Square One consists of multiple SIG-hosted rounds (maximum 2 rounds per SIG). Individual round positions contribute to cumulative Square One placement points:

Ranking / Placement

Points Awarded

Square One Event Winner

10 Points

Runner Up (2nd Place)

7 Points

Second Runner Up (3rd Place)

5 Points

Standard Round Completion

Scaled according to round difficulty guidelines

4.4 Disqualification & Misconduct Rules

An infraction of any of the following rules will result in immediate disqualification from that round, resulting in 0 points awarded and an instant misconduct flag logged against the team:

Deliberately interfering with another team's game or progress.

Accessing another team's clues, props, or materials.

Sharing answers, clues, or solutions with another team when not explicitly permitted.

Using unauthorized communication tools or external internet resources.

Tampering with event infrastructure, props, or venue materials.

Impersonating another participant.

Intentionally misleading organizers, POCs, or SIG Heads during a dispute investigation.

Harassing, obstructing, or verbally abusing participants or organizers.

Attempting to exploit a known technical or game loop after being instructed not to do so.

Violating photography/recording rules specified for the round.

5. Leaderboard Engine & Tiebreaker Protocols

5.1 Leaderboard Publication Policy

The public leaderboard does not update live.

The leaderboard is updated periodically after the conclusion of events when an Events Coordinator publishes a snapshot to leaderboard_cache.

Organizers reserve the right to correct manual data entry errors or apply misconduct penalties retroactively after an event closes.

5.2 Tiebreaker Algorithm (For Top-3 Ranks)

In the event of a tie in total points among the top 3 positions, the tiebreaker is resolved automatically using the following priority order:

Primary Tiebreaker (Scotland Yard Bonus): The team with the higher Scotland Yard Score is placed higher.

Secondary Tiebreaker (Completion Time): If still tied, the team with the lower cumulative completion time (completion_time_seconds) across rounds is placed higher.

Unforeseen Edge Cases: The SIG Head and Events Coordinator will determine an appropriate resolution prioritizing fairness. Decisions are permanently logged in the audit trail.

6. Comprehensive User Interface & User Flows

6.1 Public Portal (/) & Participant Registration (/register)

Registration Toggle: Easy switcher between "3-Member Team Registration" and "Individual Registration".

Validation UX: Real-time form checks preventing default passwords and ensuring passwords meet security complexity standards before submission.

Post-Registration Confirmation: Displays assigned #TEAM_ID with an embedded digital pass (QR Code) for venue check-ins.

+-----------------------------------------------------------------------+
|                       MEGA EVENT 2026 REGISTRATION                    |
|   [ Mode: 3-Member Team ]             [ Mode: Individual Solo Pool ]  |
+-----------------------------------------------------------------------+
|  Leader Name:  [ John Doe          ]  Email: [ john@example.com     ] |
|  Password:     [ ****************  ]  (Must meet security policy)     |
|                                                                       |
|  Member 2 Name:[ Jane Smith        ]  Email: [ jane@example.com     ] |
|  Member 3 Name:[ Bob Wilson        ]  Email: [ bob@example.com      ] |
|                                                                       |
|  [ x ] I agree to the event misconduct & dispute rules.               |
|                                                                       |
|                       [ COMPLETE REGISTRATION ]                       |
+-----------------------------------------------------------------------+


6.2 Participant Dashboard (/dashboard)

Identity Banner: Displays Team Name, assigned #TEAM_ID, and current active status (Full 3-Member, Auto-Grouped, or Duo Active Mode).

Score Card Grid: Breakout showing Scotland Yard, Square One, Bonus Points, and Net Combined Total.

Digital Pass Card: QR code containing #TEAM_ID and member roster for fast scanning by venue POCs.

+-----------------------------------------------------------------------+
| WELCOME, JOHN DOE!                                                    |
| Team Name: Matrix Solvers | ID: #TEAM042          [ Badge: Confirmed ]|
+-----------------------------------------------------------------------+
|  SCOTLAND YARD    |   SQUARE ONE    |   BONUS PTS   |   TOTAL SCORE   |
|     15 / 20       |    42 / 60      |    4 / 10     |    61 / 100    |
+-----------------------------------------------------------------------+
| TEAM MEMBERS:                                                         |
| 1. John Doe (Leader) - john@example.com                               |
| 2. Jane Smith - jane@example.com                                      |
| 3. Bob Wilson - bob@example.com                                       |
+-----------------------------------------------------------------------+
| [ DOWNLOAD DIGITAL PASS / QR CODE ]   [ REPORT ABSENCE / WITHDRAWAL ] |
+-----------------------------------------------------------------------+


6.3 POC Score Entry Console (/poc/scoring)

Fast Search: Fast input box supporting #TEAM_ID lookups or camera QR scanning.

Attendance Selection: Radio options for Full Team (3), Duo Team (2 + Bonus), or Absent.

Score Input: Inputs for Scotland Yard Base, Square One, Bonus Riddles, and Completion Time in seconds.

Misconduct Flagging Trigger: Checkbox to flag rule infractions, zeroing points for that round and sending an alert to the SIG Head console.

+-----------------------------------------------------------------------+
| POC SCORING CONSOLE                                                   |
| Fast Scan / Search Team ID: [ #TEAM042           ]  [ SEARCH ]        |
+-----------------------------------------------------------------------+
| TEAM FOUND: Matrix Solvers (#TEAM042)                                 |
|                                                                       |
| ATTENDANCE MODE:                                                      |
|   (o) Full 3 Present   ( ) Duo 2 Present (+2 Bonus)   ( ) All Absent    |
|                                                                       |
| SCORE ENTRY:                                                          |
|   Scotland Yard Points:  [ 15 ] (Max 15)                              |
|   Square One Points:      [ 42 ] (Max 60)                              |
|   Bonus Riddles:          [  2 ] (Max 5)                              |
|   Completion Time (Sec):  [ 2840 ]                                    |
|                                                                       |
| INFRACTION / MISCONDUCT:                                              |
|   [ ] Flag Misconduct Disqualification (Sets Score to 0)             |
|                                                                       |
|                          [ SUBMIT SCORE CARD ]                        |
+-----------------------------------------------------------------------+


6.4 Events Coordinator Admin Panel (/admin)

1-Click Auto-Grouping Tool: Lists unassigned individual registrants in the pool, groups them into teams of 3, generates unique #TEAM_IDs, and emails the new teammates.

Dispute Resolution Console: Interface to review escalated disputes from SIG Heads and issue binding administrative rulings.

Leaderboard Snapshot Publisher: Displays internal calculated draft scores, flags top-3 ties, applies Scotland Yard tiebreaker logic, and publishes official snapshots to the public portal.

+-----------------------------------------------------------------------+
| EVENTS COORDINATOR CONTROL ROOM                                       |
| [ Auto-Grouping Pool (12 Unassigned) ]   [ Leaderboard Publisher ]    |
+-----------------------------------------------------------------------+
| UNPUBLISHED DRAFT LEADERBOARD CALCULATIONS:                           |
| Rank | Team ID  | SY Score | SQ Score | Bonus | Time (s) | Net Total  |
|  1   | #TEAM012 |    15    |    60    |   4   |   2800   |    79      |
|  2*  | #TEAM042 |    15    |    52    |   4   |   2840   |    71 (Tied)|
|  2*  | #TEAM088 |    10    |    57    |   4   |   2700   |    71 (Tied)|
+-----------------------------------------------------------------------+
| AUTOMATED TIEBREAKER RESOLUTION:                                      |
| #TEAM042 ranked higher than #TEAM088 due to Scotland Yard Score (15 vs 10)|
+-----------------------------------------------------------------------+
|                   [ PUBLISH LEADERBOARD SNAPSHOT ]                    |
+-----------------------------------------------------------------------+


7. SIG Record Keeping & Operational Compliance

Every SIG must maintain digital records inside the portal referenced strictly by #TEAM_ID:

Master Registration List: Full record of all teams registered for each conducted round.

Attendance Log: Timestamps and presence/absence states (Full, Duo, Absent) for every round.

Bonus & Penalty Log: Detailed audit trails for every bonus point awarded or penalty deducted.

Dispute Log: Record of all verbal or written issues raised, designated POC responses, and SIG Head rulings.