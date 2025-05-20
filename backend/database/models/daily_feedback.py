from backend.database.base import db

class DailyFeedback(db.Model):
    __tablename__ = 'daily_feedback'
    DailyFeedbackId = db.Column(db.Integer, primary_key=True)
    FeedbackText = db.Column(db.Text, nullable=True)
    Date = db.Column(db.Date, nullable=False)
    StartupId = db.Column(db.Integer, db.ForeignKey('startups.StartupId'), nullable=False)
    CoachId = db.Column(db.Integer, db.ForeignKey('coaches.CoachId'), nullable=False)

    # Relationships
    coach = db.relationship('Coaches', back_populates='daily_feedback')
    startup = db.relationship('Startups', back_populates='daily_feedback')
    feedback_history = db.relationship('FeedbackHistory', back_populates='daily_feedback')
