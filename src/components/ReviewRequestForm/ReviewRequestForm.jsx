import React, { useState } from "react";
import { MessageSquare, Upload, Link, Github, FileText, X } from "lucide-react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Card from "../Card/Card";
import styles from "./ReviewRequestForm.module.css";

const ReviewRequestForm = ({ lesson, onSubmit, onCancel }) => {
  // const [files, setFiles] = useState([]);
  const [url, setUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleFileChange = (event) => {
  //   const selectedFiles = Array.from(event.target.files);
  //   const validFiles = selectedFiles.filter((file) => {
  //     const extension = file.name.split(".").pop().toLowerCase();
  //     return [
  //       "html",
  //       "css",
  //       "js",
  //       "jsx",
  //       "ts",
  //       "tsx",
  //       "json",
  //       "md",
  //       "txt",
  //     ].includes(extension);
  //   });
  //   setFiles(validFiles.slice(0, 3)); // Limit to 3 files
  // };

  // const removeFile = (index) => {
  //   setFiles(files.filter((_, i) => i !== index));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const reviewRequest = {
        // files: files.map((file) => ({
        //   name: file.name,
        //   size: file.size,
        //   type: file.type,
        //   lastModified: file.lastModified,
        // })),
        url: url.trim() || null,
        githubUrl: githubUrl.trim() || null,
        question: question.trim() || null,
        lessonId: lesson.id,
        type: "review_request",
      };

      await onSubmit(reviewRequest);
    } catch (error) {
      console.error("Review request error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={styles.reviewForm}>
      <div className={styles.header}>
        <h3>Request Peer Review</h3>
        <p>
          Get feedback and assistance for: <strong>{lesson.title}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Question/Help Request */}
        <div className={styles.section}>
          <label className={styles.label}>
            <MessageSquare size={20} />
            What do you need help with?
            <span className={styles.required}>*</span>
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Describe what you're working on, what's not working, or what specific feedback you need..."
            className={styles.textarea}
            rows={4}
            required
          />
        </div>

        {/* File Upload */}
        {/* <div className={styles.section}>
          <label className={styles.label}>
            <Upload size={20} />
            Upload Files (Optional)
          </label>
          <div className={styles.fileUpload}>
            <input
              type="file"
              multiple
              accept=".html,.css,.js,.jsx,.ts,.tsx,.json,.md,.txt"
              onChange={handleFileChange}
              className={styles.fileInput}
              id="review-file-upload"
            />
            <label
              htmlFor="review-file-upload"
              className={styles.fileUploadLabel}
            >
              <Upload size={20} />
              Choose Files
            </label>
            <p className={styles.helpText}>
              Upload your code files, screenshots, or any relevant materials
              (Max 3 files)
            </p>
          </div> */}

        {/* File List */}
        {/* {files.length > 0 && (
            <div className={styles.fileList}>
              {files.map((file, index) => (
                <div key={index} className={styles.fileItem}>
                  <FileText size={16} />
                  <span className={styles.fileName}>{file.name}</span>
                  <span className={styles.fileSize}>
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className={styles.removeFile}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div> */}

        {/* Live URL */}
        <div className={styles.section}>
          <Input
            label="Live Demo URL (Optional)"
            placeholder="https://your-project.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            icon={<Link size={20} />}
            helpText="Share a live version of your work if available"
          />
        </div>

        {/* GitHub URL */}
        <div className={styles.section}>
          <Input
            label="GitHub Repository URL (Optional)"
            placeholder="https://github.com/username/repository"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            icon={<Github size={20} />}
            helpText="Link to your code repository"
          />
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || !question.trim()}
            loading={isSubmitting}
          >
            Request Review
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ReviewRequestForm;
