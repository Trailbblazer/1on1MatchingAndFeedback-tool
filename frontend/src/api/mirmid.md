erDiagram
    %% Core Entities
    MEETING_DAY {
        int meeting_day_id PK
        date meeting_date
        time start_time
        time end_time
        int session_length_minutes
        varchar status
        timestamp created_at
        timestamp updated_at
    }
    
    STARTUP {
        int startup_id PK
        varchar name
        varchar contact_email
        varchar url
        text short_description
        varchar linkedin_url
        text other_social_profiles
        varchar status
        timestamp created_at
        timestamp updated_at
    }
    
    PERSON {
        int person_id PK
        int startup_id FK
        varchar name
        varchar contact_email
        varchar linkedin_url
        text other_social_profiles
        varchar role
        timestamp created_at
        timestamp updated_at
    }
    
    EXPERT {
        int expert_id PK
        varchar name
        varchar contact_email
        varchar linkedin_url
        text other_social_profiles
        varchar expertise_areas
        varchar status
        timestamp created_at
        timestamp updated_at
    }
    
    EXPERT_AVAILABILITY {
        int availability_id PK
        int expert_id FK
        int meeting_day_id FK
        time available_from
        time available_to
        varchar status
        timestamp created_at
        timestamp updated_at
    }
    
    SESSION {
        int session_id PK
        int meeting_day_id FK
        int startup_id FK
        int expert_id FK
        time start_time
        time end_time
        varchar location
        varchar session_type
        varchar status
        timestamp created_at
        timestamp updated_at
    }
    
    FEEDBACK_QUESTION {
        int question_id PK
        varchar question_text
        varchar target_audience
        varchar question_type
        varchar options
        boolean is_required
        int display_order
        varchar status
        timestamp created_at
        timestamp updated_at
    }
    
    FEEDBACK_FORM {
        int form_id PK
        int meeting_day_id FK
        int respondent_id
        varchar respondent_type
        varchar form_status
        timestamp created_at
        timestamp completed_at
        timestamp updated_at
    }
    
    FEEDBACK_RESPONSE {
        int response_id PK
        int form_id FK
        int question_id FK
        int session_id FK
        text response_text
        int rating_value
        timestamp created_at
        timestamp updated_at
    }
    
    SCHEDULE {
        int schedule_id PK
        int meeting_day_id FK
        varchar schedule_type
        varchar target_audience
        varchar status
        timestamp generated_at
        timestamp published_at
        timestamp updated_at
    }
    
    OPS_USER {
        int ops_id PK
        varchar username
        varchar email
        varchar role
        varchar status
        timestamp created_at
        timestamp last_login
    }
    
    %% Relationships
    STARTUP ||--o{ PERSON : "has"
    EXPERT ||--o{ EXPERT_AVAILABILITY : "has"
    MEETING_DAY ||--o{ EXPERT_AVAILABILITY : "for"
    MEETING_DAY ||--o{ SESSION : "contains"
    STARTUP ||--o{ SESSION : "participates_in"
    EXPERT ||--o{ SESSION : "conducts"
    MEETING_DAY ||--o{ FEEDBACK_FORM : "generates"
    FEEDBACK_FORM ||--o{ FEEDBACK_RESPONSE : "contains"
    FEEDBACK_QUESTION ||--o{ FEEDBACK_RESPONSE : "answered_by"
    SESSION ||--o{ FEEDBACK_RESPONSE : "relates_to"
    MEETING_DAY ||--o{ SCHEDULE : "has"
    OPS_USER ||--o{ MEETING_DAY : "manages"
    OPS_USER ||--o{ SESSION : "assigns"
    OPS_USER ||--o{ FEEDBACK_QUESTION : "creates"