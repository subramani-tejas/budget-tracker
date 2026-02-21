package com.example.budget;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.Spreadsheet;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SheetController {

    @Value("${google.api.key}")
    private String apiKey;

    @Value("${google.sheet.id}")
    private String sheetId;

    @GetMapping("/api/sheet-title")
    public String getTitle() throws Exception {
        Sheets sheetsService = new Sheets.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance(),
                null)
                .setApplicationName("Budget Tracker")
                .build();

        Spreadsheet response = sheetsService.spreadsheets().get(sheetId)
                .setKey(apiKey)
                .execute();

        return response.getProperties().getTitle();
    }
}