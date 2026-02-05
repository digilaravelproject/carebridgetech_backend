import React, { useState } from 'react'
import { Box, Button, DropZone, Label, Text, Input, Icon, Loader } from '@adminjs/design-system'
import { ApiClient } from 'adminjs'

const UploadTool = () => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState(null)
  const [error, setError] = useState(null)

  const onUpload = async () => {
    if (!file) return

    setLoading(true)
    setError(null)
    setUploadedUrl(null)

    const formData = new FormData()
    formData.append('image', file)

    try {
      // Direct fetch usage since ApiClient might be configured for admin routes
      // We are hitting a custom API route
      const response = await fetch('/api/upload/content-image', {
        method: 'POST',
        body: formData,
      })
      
      const data = await response.json()

      if (data.success) {
        setUploadedUrl(data.filePath) // Relative path
      } else {
        setError(data.error || 'Upload failed')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDrop = (files) => {
    if (files.length) {
      setFile(files[0])
      setError(null)
    }
  }

  const copyToClipboard = () => {
    if (uploadedUrl) {
      const fullUrl = window.location.origin + uploadedUrl
      navigator.clipboard.writeText(fullUrl)
      alert('URL copied to clipboard!')
    }
  }

  return (
    <Box variant="grey" padding="xl">
      <Box variant="white" padding="xl" boxShadow="card" maxWidth="600px" mx="auto">
        <Text as="h2" mb="lg">Content Image Upload Tool</Text>
        
        <Box mb="xl">
          <Label>Select Image</Label>
          <DropZone 
            files={file ? [file] : []} 
            onChange={handleDrop} 
            multiple={false}
            accept={['image/*']}
          />
        </Box>

        {error && (
          <Box mb="lg" p="default" bg="errorLight" color="error">
            <Text>{error}</Text>
          </Box>
        )}

        {loading ? (
           <Box textAlign="center" mb="lg">
             <Loader />
             <Text mt="default">Uploading...</Text>
           </Box>
        ) : (
           <Button onClick={onUpload} disabled={!file} variant="primary" size="lg" width="100%">
             Upload Image
           </Button>
        )}

        {uploadedUrl && (
          <Box mt="xl" p="lg" bg="successLight" border="1px solid" borderColor="success">
            <Text as="h3" mb="default" color="success">Upload Successful!</Text>
            
            <Label>Relative Path (Best for Database)</Label>
            <Box flex alignItems="center" gap="default" mb="lg">
              <Input 
                value={uploadedUrl} 
                readOnly 
                width="100%" 
              />
              <Button onClick={() => {
                navigator.clipboard.writeText(uploadedUrl)
                alert('Path copied!')
              }} variant="success" ml="default">
                Copy
              </Button>
            </Box>

            <Label>Full URL (For Testing)</Label>
            <Box flex alignItems="center" gap="default">
              <Input 
                value={window.location.origin + uploadedUrl} 
                readOnly 
                width="100%" 
              />
              <Button onClick={copyToClipboard} variant="primary" ml="default">
                Copy
              </Button>
            </Box>

            <Box mt="lg" textAlign="center">
              <Text mb="sm">Preview:</Text>
              <img 
                src={uploadedUrl} 
                alt="Uploaded" 
                style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px' }} 
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default UploadTool
