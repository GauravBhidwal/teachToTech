-- V1__create_cr_courses_dtl_table.sql

CREATE TABLE cr_courses_dtl (
    id BIGSERIAL PRIMARY KEY,
    duration VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL,
    category_id VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    modules VARCHAR(255) NOT NULL,
    status VARCHAR(255),
    course_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    rejection_comment VARCHAR(255),
    user_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Additional fields
    trainer_name VARCHAR(255),
    trainer_image VARCHAR(255),
    trainer_description TEXT,
    video_url TEXT,
    schedule VARCHAR(255),
    timings VARCHAR(255)
);

-- Indexes
CREATE INDEX idx_category_id ON cr_courses_dtl (category_id);
CREATE INDEX idx_course_name ON cr_courses_dtl (course_name);
CREATE INDEX idx_created_at ON cr_courses_dtl (created_at);
