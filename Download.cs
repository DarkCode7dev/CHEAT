public IActionResult Download(string filename)
{
    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", filename);
    if (!System.IO.File.Exists(filePath))
    {
        return NotFound();
    }
    var memory = new MemoryStream();
    using (var stream = new FileStream(filePath, FileMode.Open))
    {
        stream.CopyTo(memory);
    }
    memory.Position = 0;
    return File(memory, GetContentType(filePath), Path.GetFileName(filePath));
}

private string GetContentType(string path)
{
    var types = GetMimeTypes();
    var ext = Path.GetExtension(path).ToLowerInvariant();
    return types[ext];
}

private Dictionary<string, string> GetMimeTypes()
{
    return new Dictionary<string, string>
    {
        {".txt", "text/plain"},
        {".pdf", "application/pdf"},
        {".doc", "application/vnd.ms-word"},
        {".docx", "application/vnd.ms-word"},
        {".xls", "application/vnd.ms-excel"},
        {".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
        {".png", "image/png"},
        {".jpg", "image/jpeg"},
        {".jpeg", "image/jpeg"},
        {".gif", "image/gif"},
        {".csv", "text/csv"}
    };
}
