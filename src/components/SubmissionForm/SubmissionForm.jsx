import React, { useState } from "react";
import { Upload, Link, Github, FileText, X } from "lucide-react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Card from "../Card/Card";
import styles from "./SubmissionForm.module.css";

const SubmissionForm = ({ lesson, onSubmit, onCancel }) => {
  const [files, setFiles] = useState([]);
  const [url, setUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const { allowedTypes, maxSize, maxFiles } = lesson.submissionRequirements;

    // Validate file types
    const validFiles = selectedFiles.filter((file) => {
      const extension = file.name.split(".").pop().toLowerCase();
      return allowedTypes.includes(extension);
    });

    // Validate file size
    const maxSizeBytes = parseInt(maxSize) * 1024 * 1024; // Convert MB to bytes
    const sizeValidFiles = validFiles.filter(
      (file) => file.size <= maxSizeBytes
    );

    // Limit number of files
    const finalFiles = sizeValidFiles.slice(0, maxFiles || 5);

    setFiles(finalFiles);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submission = {
        files: files.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
        })),
        url: url.trim() || null,
        githubUrl: githubUrl.trim() || null,
        notes: notes.trim() || null,
        requirements: lesson.submissionRequirements,
      };

      await onSubmit(submission);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const { submissionRequirements } = lesson;

  return (
    <Card className={styles.submissionForm}>
      <div className={styles.header}>
        <h3>Submit Assignment</h3>
        <p>
          Complete your submission for: <strong>{lesson.title}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* File Upload
        {submissionRequirements.type === "file" ||
          (submissionRequirements.type === "files" && (
            <div className={styles.section}>
              <label className={styles.label}>
                <Upload size={20} />
                Upload Files
                {submissionRequirements.required && (
                  <span className={styles.required}>*</span>
                )}
              </label>
              <div className={styles.fileUpload}>
                <input
                  type="file"
                  multiple={submissionRequirements.type === "files"}
                  accept={submissionRequirements.allowedTypes
                    .map((type) => `.${type}`)
                    .join(",")}
                  onChange={handleFileChange}
                  className={styles.fileInput}
                  id="file-upload"
                />
                <label htmlFor="file-upload" className={styles.fileUploadLabel}>
                  <Upload size={20} />
                  Choose Files
                </label>
                <p className={styles.helpText}>
                  Allowed types:{" "}
                  {submissionRequirements.allowedTypes.join(", ")}
                  (Max {submissionRequirements.maxSize},{" "}
                  {submissionRequirements.maxFiles || 5} files)
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
            </div>
          ))} */}

        {/* Live URL */}
        {/* {submissionRequirements.requiresUrl && ( */}
        <div className={styles.section}>
          <Input
            label="Live Demo URL"
            placeholder="https://your-project.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            icon={<Link size={20} />}
            required={submissionRequirements.requiresUrl}
            helpText="Provide a live URL where your project can be viewed"
          />
        </div>
        {/* )} */}

        {/* GitHub URL */}
        {/* {submissionRequirements.requiresGitHub && ( */}
        <div className={styles.section}>
          <Input
            label="GitHub Repository URL"
            placeholder="https://github.com/username/repository"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            icon={<Github size={20} />}
            required={submissionRequirements.requiresGitHub}
            helpText="Link to your GitHub repository"
          />
        </div>
        {/* )} */}

        {/* Notes */}
        <div className={styles.section}>
          <label className={styles.label}>Additional Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional information about your submission..."
            className={styles.textarea}
            rows={4}
          />
        </div>

        {/* Requirements Summary */}
        <div className={styles.requirements}>
          <h4>Submission Requirements:</h4>
          <ul>
            {/* {submissionRequirements.description && ( */}
            <li>{submissionRequirements.description}</li>
            {/* )} */}
            {/* {submissionRequirements.allowedTypes && ( */}
            <li>
              File types: {submissionRequirements.allowedTypes.join(", ")}
            </li>
            {/* )} */}
            {/* {submissionRequirements.maxSize && ( */}
            <li>Max file size: {submissionRequirements.maxSize}</li>
            {/* )} */}
            {/* {submissionRequirements.maxFiles && ( */}
            <li>Max files: {submissionRequirements.maxFiles}</li>
            {/* )} */}
            {/* {submissionRequirements.requiresUrl &&  */}
            <li>Live URL required</li>
            {/* } */}
            {/* {submissionRequirements.requiresGitHub && ( */}
            <li>GitHub repository required</li>
            {/* )} */}
          </ul>
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
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Submit Assignment
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default SubmissionForm;
