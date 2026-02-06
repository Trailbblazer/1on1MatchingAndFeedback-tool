CREATE TABLE coaches (
	CoachId INTEGER NOT NULL,
	CoachName VARCHAR(100) NOT NULL,
	Email VARCHAR(100) NOT NULL,
	Phone VARCHAR(100),
	Chat VARCHAR(100),
	Bio TEXT,
	Expertise VARCHAR(200),
	SocialMedia TEXT,
	CoachingSessions INTEGER NOT NULL,
	BatchesCoached INTEGER NOT NULL,
	PRIMARY KEY (CoachId),
	UNIQUE (Email)
);
CREATE TABLE startups (
	StartupId INTEGER NOT NULL,
	StartupName VARCHAR(100) NOT NULL,
	Website VARCHAR(255) NOT NULL,
	Status VARCHAR(20) NOT NULL,
	PreviousNames TEXT NOT NULL,
	StartupMembers TEXT NOT NULL,
	StartupSocialMedia TEXT,
	StartupDescription VARCHAR(255),
	MeetingsCount INTEGER NOT NULL,
	PRIMARY KEY (StartupId)
);
CREATE TABLE banned_to_meet (
	RestrictionId INTEGER NOT NULL,
	StartupId INTEGER NOT NULL,
	CoachId INTEGER NOT NULL,
	DateFrom DATE NOT NULL,
	DateTo DATE,
	Reason TEXT,
	PRIMARY KEY (RestrictionId),
	FOREIGN KEY(StartupId) REFERENCES startups (StartupId),
	FOREIGN KEY(CoachId) REFERENCES coaches (CoachId)
);
CREATE TABLE coach_slots (
	SlotId INTEGER NOT NULL,
	CoachId INTEGER NOT NULL,
	Slot VARCHAR(50) NOT NULL,
	Duration INTEGER NOT NULL,
	Date DATE NOT NULL,
	IsBreak BOOLEAN NOT NULL,
	PRIMARY KEY (SlotId),
	FOREIGN KEY(CoachId) REFERENCES coaches (CoachId)
);
CREATE TABLE daily_feedback (
	DailyFeedbackId INTEGER NOT NULL,
	FeedbackText TEXT,
	Date DATE NOT NULL,
	StartupId INTEGER NOT NULL,
	CoachId INTEGER NOT NULL,
	PRIMARY KEY (DailyFeedbackId),
	FOREIGN KEY(StartupId) REFERENCES startups (StartupId),
	FOREIGN KEY(CoachId) REFERENCES coaches (CoachId)
);
CREATE TABLE coach_assignments (
	AssignmentId INTEGER NOT NULL,
	StartupName VARCHAR(100) NOT NULL,
	Slot VARCHAR(50) NOT NULL,
	Duration INTEGER NOT NULL,
	Date DATE NOT NULL,
	CoachId INTEGER NOT NULL,
	StartupId INTEGER NOT NULL,
	SlotId INTEGER NOT NULL,
	PRIMARY KEY (AssignmentId),
	FOREIGN KEY(CoachId) REFERENCES coaches (CoachId),
	FOREIGN KEY(StartupId) REFERENCES startups (StartupId),
	FOREIGN KEY(SlotId) REFERENCES coach_slots (SlotId)
);
CREATE TABLE feedback_history (
	FeedbackHistoryId INTEGER NOT NULL,
	StartupName VARCHAR(100) NOT NULL,
	DateFeedbackOriginal DATE NOT NULL,
	StartupGrade INTEGER NOT NULL,
	CoachGrade INTEGER NOT NULL,
	StartupTextFeedback TEXT,
	CoachTextFeedback TEXT,
	UpdatedStartupGrade INTEGER,
	DateUpdatedStartupGrade DATE,
	DailyFeedbackId INTEGER NOT NULL,
	StartupId INTEGER NOT NULL,
	CoachId INTEGER NOT NULL,
	PRIMARY KEY (FeedbackHistoryId),
	FOREIGN KEY(DailyFeedbackId) REFERENCES daily_feedback (DailyFeedbackId),
	FOREIGN KEY(StartupId) REFERENCES startups (StartupId),
	FOREIGN KEY(CoachId) REFERENCES coaches (CoachId)
);
