from backend.database.base import db

class Coaches(db.Model):
    __tablename__ = 'coaches'
    CoachId = db.Column(db.Integer, primary_key=True)
    CoachName = db.Column(db.String(100), nullable=False)
    PrimaryContact = db.Column(db.String(100), nullable=False)
    SecondaryContact = db.Column(db.String(100), nullable=True)
    CoachDescription = db.Column(db.Text, nullable=True)
    CoachSocialMedia1 = db.Column(db.String(100), nullable=True)
    CoachSocialMedia2 = db.Column(db.String(100), nullable=True)
    NeedsBreak = db.Column(db.Boolean, nullable=False)

    # Relationships
    slots = db.relationship('CoachSlots', back_populates='coach')
    feedback = db.relationship('FeedbackHistory', back_populates='coach')
    daily_feedback = db.relationship('DailyFeedback', back_populates='coach')
    assignments = db.relationship('CoachAssignments', back_populates='coach')
