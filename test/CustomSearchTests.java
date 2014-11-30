package com.saucelabs;

import java.util.UUID;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.Test;
import static org.testng.Assert.assertEquals;

public class CustomSearchTests extends SauceAdapter
{
	String baseURL = "http://iie-dev.cs.fiu.edu/";
	String testURL = baseURL + "custom_search.html";
	
	@Test(dataProvider = "hardCodedBrowsers")
	public void verifyBasicUILayout(String browser, String version, String os) throws Exception {
		WebDriver driver = createDriver(browser, version, os);
        driver.get(testURL);
        
        //Confirm layout.
        verifyExistence(driver, driver.findElement(By.className("panel-heading")));
        verifyExistence(driver, driver.findElement(By.className("panel-body")));
        
        //Confirm input fields.
        verifyExistence(driver, driver.findElement(By.id("query")));
        verifyExistence(driver, driver.findElement(By.id("tags")));
        
        //Confirm UI/Buttons.
        verifyExistence(driver, driver.findElement(By.id("add")));
        verifyExistence(driver, driver.findElement(By.id("search")));
        verifyExistence(driver, driver.findElement(By.id("submit")));
        
        driver.quit();
	}
	
	@Test(dataProvider = "hardCodedBrowsers")
	public void verifyDataStorage(String browser, String version, String os) throws Exception {
		WebDriver driver = createDriver(browser, version, os);
		driver.get(testURL);
		
		//Generate a random UUID for this test.
		String target = UUID.randomUUID().toString();
		
		//Add a real query to the query location, tag and store it.
		driver.findElement(By.id("query")).sendKeys("SELECT ?x ?y ?z WHERE { ?x ?y ?z }");
		driver.findElement(By.id("tags")).sendKeys(target);
		driver.findElement(By.id("add")).click();
		Thread.sleep(5000);
		
		//Recall the query.
		driver.get(testURL);
		driver.findElement(By.id("tags")).sendKeys(target);
		driver.findElement(By.id("search")).click();
		Thread.sleep(5000);
		
		//Verify the query's storage.
		if(driver.findElement(By.id("query")).getText().length() == 0)
			throw new Exception("Storage failure for custom queries.");
		
		driver.quit();
	}
}