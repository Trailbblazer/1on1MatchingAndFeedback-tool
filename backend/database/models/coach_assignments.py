from backend.database.base import db

class CoachAssignments(db.Model):
    __tablename__ = 'coach_assignments'
    AssignmentId = db.Column(db.Integer, primary_key=True)
    StartupName = db.Column(db.String(100), nullable=False)
    Slot = db.Column(db.String(50), nullable=False)
    Duration = db.Column(db.Integer, nullable=False)
    Date = db.Column(db.Date, nullable=False)
    CoachId = db.Column(db.Integer, db.ForeignKey('coaches.CoachId'), nullable=False)
    StartupId = db.Column(db.Integer, db.ForeignKey('startups.StartupId'), nullable=False)
    SlotId = db.Column(db.Integer, db.ForeignKey('coach_slots.SlotId'), nullable=False)

    # Relationships
    coach = db.relationship('Coaches', back_populates='assignments')
    startup = db.relationship('Startups', back_populates='assignments')
    slot = db.relationship('CoachSlots', lazy='joined')
