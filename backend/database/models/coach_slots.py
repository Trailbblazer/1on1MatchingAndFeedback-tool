from backend.database.base import db

class CoachSlots(db.Model):
    __tablename__ = 'coach_slots'
    SlotId = db.Column(db.Integer, primary_key=True)
    CoachId = db.Column(db.Integer, db.ForeignKey('coaches.CoachId'), nullable=False)
    Slot = db.Column(db.String(50), nullable=False)
    Duration = db.Column(db.Integer, nullable=False)
    Date = db.Column(db.Date, nullable=False)
    IsBreak = db.Column(db.Boolean, nullable=False)

    # Relationship to Coaches
    coach = db.relationship('Coaches', back_populates='slots')
