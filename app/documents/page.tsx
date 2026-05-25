'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { ProtectedLayout } from '@/components/ProtectedLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  File,
  Trash2,
  Download,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileText,
} from 'lucide-react';
import { Document } from '@/types';
import { getAxiosInstance, handleAPIError } from '@/lib/api-client';
import { Skeleton } from '@/components/ui/skeleton';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const api = getAxiosInstance();

  // Fetch existing documents on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get('/documents');
        if (!cancelled) setDocuments(data.documents || []);
      } catch (err) {
        if (!cancelled) handleAPIError(err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [api]);

  // Dropzone configuration
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback(
      async (acceptedFiles: File[]) => {
        setError('');
        setIsLoading(true);

        try {
          for (const file of acceptedFiles) {
            const formData = new FormData();
            formData.append('file', file);

            // Add document to list with uploading status
            const tempDoc: Document = {
              id: `${Date.now()}_${Math.random()}`,
              name: file.name,
              size: file.size,
              uploadedAt: new Date(),
              status: 'uploading',
            };

            setDocuments((prev) => [...prev, tempDoc]);

            try {
              const response = await api.post('/documents/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
              });

              // Update document status
              setDocuments((prev) =>
                prev.map((doc) =>
                  doc.id === tempDoc.id
                    ? {
                        ...response.data,
                        status: 'processing' as const,
                      }
                    : doc
                )
              );

              // Poll for completion
              pollDocumentStatus(response.data.id);
            } catch (err) {
              const apiError = handleAPIError(err);
              setDocuments((prev) =>
                prev.map((doc) =>
                  doc.id === tempDoc.id
                    ? {
                        ...doc,
                        status: 'error' as const,
                        error: apiError.message,
                      }
                    : doc
                )
              );
            }
          }
        } finally {
          setIsLoading(false);
        }
      },
      [api]
    ),
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
        '.docx',
      ],
    },
  });

  // Poll for document processing status
  const pollDocumentStatus = (docId: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await api.get(`/documents/${docId}/status`);
        const { status } = response.data;

        setDocuments((prev) =>
          prev.map((doc) =>
            doc.id === docId ? { ...doc, status: status as any } : doc
          )
        );

        if (status === 'ready' || status === 'error') {
          clearInterval(pollInterval);
        }
      } catch (err) {
        handleAPIError(err);
        clearInterval(pollInterval);
      }
    }, 2000);
  };

  const handleDeleteDocument = async (docId: string) => {
    try {
      await api.delete(`/documents/${docId}`);
      setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
    } catch (err) {
      const apiError = handleAPIError(err);
      setError(apiError.message);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'uploading':
        return <Loader2 size={18} className="animate-spin text-primary" />;
      case 'processing':
        return <Loader2 size={18} className="animate-spin text-accent" />;
      case 'ready':
        return <CheckCircle2 size={18} className="text-green-500" />;
      case 'error':
        return <AlertCircle size={18} className="text-destructive" />;
      default:
        return <FileText size={18} className="text-muted-foreground" />;
    }
  };

  return (
    <ProtectedLayout>
      <div className="flex flex-col h-full max-h-screen overflow-hidden bg-background">
        {/* Header */}
        <div className="flex-shrink-0 px-4 py-4 border-b border-border md:px-6 md:py-5">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            Document Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Upload documents for intelligent analysis and retrieval
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Upload dropzone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 md:p-12 text-center transition-all cursor-pointer ${
                isDragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary hover:bg-primary/2'
              }`}
            >
              <input {...getInputProps()} />
              <motion.div
                animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Upload
                  size={48}
                  className={`mx-auto mb-4 ${
                    isDragActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {isDragActive
                  ? 'Drop your files here'
                  : 'Drag and drop files here'}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                or click to select files (PDF, DOC, DOCX, TXT)
              </p>
              <Button disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={16} className="mr-2" />
                    Select Files
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg flex items-center gap-2"
            >
              <AlertCircle size={18} className="flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          {/* Documents list */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Uploaded Documents {documents.length > 0 && `(${documents.length})`}
            </h2>

            {documents.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-muted-foreground"
              >
                <File size={48} className="mx-auto mb-4 opacity-20" />
                <p>No documents uploaded yet</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {documents.map((doc, index) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="p-4 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            {getStatusIcon(doc.status)}
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-foreground truncate text-sm">
                                {doc.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(doc.size)}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="p-1 hover:bg-destructive/10 rounded transition-smooth"
                            disabled={doc.status === 'uploading'}
                          >
                            <Trash2 size={16} className="text-destructive" />
                          </button>
                        </div>

                        {/* Status badge */}
                        <div className="mb-3">
                          <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                              doc.status === 'ready'
                                ? 'bg-green-100 text-green-800'
                                : doc.status === 'error'
                                ? 'bg-destructive/10 text-destructive'
                                : 'bg-primary/10 text-primary'
                            }`}
                          >
                            {doc.status === 'uploading'
                              ? 'Uploading'
                              : doc.status === 'processing'
                              ? 'Processing'
                              : doc.status === 'ready'
                              ? 'Ready'
                              : 'Error'}
                          </span>
                        </div>

                        {/* Error message */}
                        {doc.error && (
                          <p className="text-xs text-destructive mt-2">{doc.error}</p>
                        )}

                        {/* Progress bar */}
                        {doc.status !== 'ready' && doc.status !== 'error' && (
                          <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-primary"
                              initial={{ width: 0 }}
                              animate={{
                                width:
                                  doc.status === 'uploading' ? '60%' : '90%',
                              }}
                              transition={{
                                duration: 0.5,
                                ease: 'easeInOut',
                              }}
                            />
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
