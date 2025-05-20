from backend.database.base import db

class BannedToMeet(db.Model):
    __tablename__ = 'banned_to_meet'
    RestrictionId = db.Column(db.Integer, primary_key=True)
    StartupId = db.Column(db.Integer, db.ForeignKey('startups.StartupId'), nullable=False)
    CoachId = db.Column(db.Integer, db.ForeignKey('coaches.CoachId'), nullable=False)
    DateFrom = db.Column(db.Date, nullable=False)
    DateTo = db.Column(db.Date, nullable=True)
    Reason = db.Column(db.Text, nullable=True)

    # Relationships
    coach = db.relationship('Coaches', lazy='joined')
    startup = db.relationship('Startups', lazy='joined')
