from backend.database.base import db

class Startups(db.Model):
    __tablename__ = 'startups'
    StartupId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    StartupName = db.Column(db.String(100), nullable=False)
    StartupMembers = db.Column(db.String(255), nullable=False)
    PrimaryContact = db.Column(db.String(100), nullable=False)
    SecondaryContact = db.Column(db.String(100))
    StartupDescription = db.Column(db.String(255))
    StartupWebsite = db.Column(db.String(255))
    StartupSocialMedia1 = db.Column(db.String(255))
    StartupSocialMedia2 = db.Column(db.String(255))
    MeetingsCount = db.Column(db.Integer, nullable=False)

    # Relationships
    feedback = db.relationship('FeedbackHistory', back_populates='startup')
    daily_feedback = db.relationship('DailyFeedback', back_populates='startup')
    assignments = db.relationship('CoachAssignments', back_populates='startup')
