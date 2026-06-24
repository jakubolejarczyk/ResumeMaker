USE ResumeMaker;
GO

CREATE TABLE resumes (
	id INT NOT NULL IDENTITY(1,1),
	job_title VARCHAR(255) NOT NULL,
	user_id INT NOT NULL,
	CONSTRAINT pk_resumes PRIMARY KEY (id),
	CONSTRAINT fk_resumes_users FOREIGN KEY (user_id) REFERENCES users(id)
);