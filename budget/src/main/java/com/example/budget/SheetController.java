package com.example.budget;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.Spreadsheet;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;
import com.google.api.services.sheets.v4.model.ValueRange;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import java.util.Collections;

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

    @PostMapping("/api/add-expense")
    public String addExpense(@RequestBody Map<String, String> payload) throws Exception {

        // Load the JSON credentials
        GoogleCredential credential = GoogleCredential.fromStream(getClass().getResourceAsStream("/credentials.json"))
                .createScoped(Collections.singleton("https://www.googleapis.com/auth/spreadsheets"));

        Sheets sheetsService = new Sheets.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance(),
                credential) // Pass credentials here
                .setApplicationName("Sheets PoC")
                .build();

        List<Object> rowValues = Arrays.asList(
                payload.get("date"),
                payload.get("description"),
                "$" + payload.get("cost"),
                payload.get("category")
        );

        ValueRange body = new ValueRange().setValues(Arrays.asList(rowValues));

        sheetsService.spreadsheets().values()
                .append(sheetId, "out!A:D", body)
                .setValueInputOption("USER_ENTERED")
                // .setKey(apiKey) <-- REMOVE THIS LINE
                .execute();

        return "Success";
    }
}