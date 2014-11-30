package com.saucelabs;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.Select;
import org.testng.annotations.Test;
import static org.testng.Assert.assertEquals;

public class SubmitTests extends SauceAdapter
{
	String testURL = baseURL + "submit.html";
	
	@Test(dataProvider = "hardCodedBrowsers")
	public void verifyBasicUILayout(String browser, String version, String os) throws Exception {
		WebDriver driver = createDriver(browser, version, os);
        driver.get(testURL);
        
        //Confirm layout.
        verifyExistence(driver, driver.findElement(By.className("panel-heading")));
        verifyExistence(driver, driver.findElement(By.className("panel-body")));
        
        //Confirm input fields.
        verifyExistence(driver, driver.findElement(By.id("reporterName")));
        verifyExistence(driver, driver.findElement(By.id("prefixName")));
        verifyExistence(driver, driver.findElement(By.id("subject")));
        verifyExistence(driver, driver.findElement(By.id("data-prefix1")));
        verifyExistence(driver, driver.findElement(By.id("data-pred1")));
        verifyExistence(driver, driver.findElement(By.id("data-1")));
        
        //Confirm UI/Buttons.
        verifyExistence(driver, driver.findElement(By.id("plus")));
        verifyExistence(driver, driver.findElement(By.id("minus")));
        verifyExistence(driver, driver.findElement(By.id("submit")));
        verifyExistence(driver, driver.findElement(By.id("bulk-import")));
        
        driver.quit();
	}
	
	@Test(dataProvider = "hardCodedBrowsers")
	public void verifyModularUI(String browser, String version, String os) throws Exception {
		WebDriver driver = createDriver(browser, version, os);
        driver.get(testURL);
       
        //Verify initial state.
        verifyExistence(driver, driver.findElement(By.id("plus")));
        verifyExistence(driver, driver.findElement(By.id("minus")));
        
        //Add a new element set.
        driver.findElement(By.id("plus")).click();
        Thread.sleep(2000);
        
        //Verify the new element set.
        verifyExistence(driver, driver.findElement(By.id("data-prefix2")));
        verifyExistence(driver, driver.findElement(By.id("data-pred2")));
        verifyExistence(driver, driver.findElement(By.id("data-2")));
        
        //Add a new element set.
        driver.findElement(By.id("minus")).click();
        Thread.sleep(2000);
        
        //Verify the original set exists.
        verifyExistence(driver, driver.findElement(By.id("data-prefix1")));
        verifyExistence(driver, driver.findElement(By.id("data-pred1")));
        verifyExistence(driver, driver.findElement(By.id("data-1")));
      
        if(By.id("data-prefix2") != null || By.id("data-pred1") != null || By.id("data-1") != null)
        {
        	throw new Exception ("A dynamic UI element was not removed.");
        }
        
        //Add a new element set.
        driver.findElement(By.id("plus")).click();
        Thread.sleep(2000);
        
        //Verify the new element set is correctly named.
        verifyExistence(driver, driver.findElement(By.id("data-prefix2")));
        verifyExistence(driver, driver.findElement(By.id("data-pred2")));
        verifyExistence(driver, driver.findElement(By.id("data-2")));
      
        driver.quit();
	}
	

	@Test(dataProvider = "hardCodedBrowsers")
	public void verifyEvidenceEvaluation(String browser, String version, String os) throws Exception {
		WebDriver driver = createDriver(browser, version, os);
		driver.get(testURL);
		
		//Add an element.
		driver.findElement(By.id("data-1")).sendKeys("Google");
		driver.findElement(By.id("plus")).click();
		Thread.sleep(2000);
		
		//Add the evidence element.
		driver.findElement(By.id("data-2")).sendKeys("http://www.google.com");
		Select sel = new Select(driver.findElement(By.id("data-pred2")));
		sel.selectByValue("evidence");
		Thread.sleep(2000);
		
		//Verify gauge existence.
		verifyExistence(driver, driver.findElement(By.id("wordsMatched")));
		verifyExistence(driver, driver.findElement(By.id("wordsText")));
		verifyExistence(driver, driver.findElement(By.id("wordsNotMatched")));
		verifyExistence(driver, driver.findElement(By.id("confidence")));
		
		driver.quit();
	}
	
	@Test(dataProvider = "hardCodedBrowsers")
	public void verifyAutocompleteCapabilities(String browser, String version, String os) throws Exception {
		WebDriver driver = createDriver(browser, version, os);
        
      	//Verify data-level autocomplete.
      	driver.get(testURL);
        driver.findElement(By.id("data-1")).sendKeys("a");
        driver.findElement(By.className("ui-autocomplete ui-front ui-menu ui-widget ui-widget-content"));
        
        //Verify prefix-level autocomplete.
        driver.get(testURL);
        driver.findElement(By.id("prefixName")).sendKeys("a");
        driver.findElement(By.className("ui-autocomplete ui-front ui-menu ui-widget ui-widget-content"));
        
        driver.quit();
	}
	
	
	@Test(dataProvider = "hardCodedBrowsers")
	public void verifyBulkImporting(String browser, String version, String os) throws Exception {
		WebDriver driver = createDriver(browser, version, os);
        
      	//This test is wholly useless but it will at least serve as a warning if the button disappears all of a sudden.
      	driver.get(testURL);
        driver.findElement(By.id("bulk-import")).click();
        driver.quit();
	}
}