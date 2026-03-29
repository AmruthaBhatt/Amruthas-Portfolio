# Simple HTTP Server for Portfolio Website
# Run this file to start local development server at http://localhost:8000

$port = 8000
$folder = "C:\Users\Amrutha Bhat\Desktop\Portfolio Website"

Write-Host "Starting Local Server..." -ForegroundColor Green
Write-Host "📁 Serving files from: $folder" -ForegroundColor Cyan
Write-Host "🌐 Access your portfolio at: http://localhost:$port" -ForegroundColor Yellow
Write-Host "🛑 Press Ctrl+C to stop the server" -ForegroundColor Red
Write-Host ""

# Create HTTP listener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "✅ Server is running..." -ForegroundColor Green

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $url = $request.Url.LocalPath
    if ($url -eq "/" -or $url -eq "") { $url = "/index.html" }
    
    $filePath = Join-Path $folder $url.TrimStart("/")
    
    if (Test-Path $filePath -PathType Leaf) {
        $content = Get-Content $filePath -Raw -Encoding UTF8
        $encoding = [System.Text.Encoding]::UTF8
        $response.ContentEncoding = $encoding
        
        # Set correct content type
        if ($url.EndsWith(".html")) { $response.ContentType = "text/html; charset=utf-8" }
        elseif ($url.EndsWith(".css")) { $response.ContentType = "text/css; charset=utf-8" }
        elseif ($url.EndsWith(".js")) { $response.ContentType = "application/javascript; charset=utf-8" }
        elseif ($url.EndsWith(".json")) { $response.ContentType = "application/json" }
        else { $response.ContentType = "text/plain" }
        
        $buffer = $encoding.GetBytes($content)
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
        $response.StatusCode = 200
        
        Write-Host "✓ GET $url [200]" -ForegroundColor Green
    }
    else {
        # Try index.html for unknown routes
        $indexPath = Join-Path $folder "index.html"
        if (Test-Path $indexPath) {
            $content = Get-Content $indexPath -Raw -Encoding UTF8
            $encoding = [System.Text.Encoding]::UTF8
            $response.ContentType = "text/html; charset=utf-8"
            $response.ContentEncoding = $encoding
            $buffer = $encoding.GetBytes($content)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.StatusCode = 200
            
            Write-Host "✓ GET $url → index.html [200]" -ForegroundColor Green
        }
        else {
            $response.StatusCode = 404
            Write-Host "✗ GET $url [404]" -ForegroundColor Red
        }
    }
    
    $response.Close()
}

$listener.Stop()
