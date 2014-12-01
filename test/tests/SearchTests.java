import java.util.concurrent.TimeUnit;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;


public class SearchTests
{
	String baseURL = "http://iie-dev.cs.fiu.edu/";
	String testURL = baseURL + "search.html";
	
	private WebDriver driver;
	
	@BeforeTest
    public void setUp() throws Exception {

       driver = new FirefoxDriver();
       driver.manage().window().maximize();
       driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
    }
	
	@Test
	public void verifyBasicUILayout() throws Exception {
        driver.get(testURL);
        
        //Confirm layout.
        Thread.sleep(200);
        verifyExistence(driver, driver.findElement(By.className("panel-heading")));
        verifyExistence(driver, driver.findElement(By.className("panel-body")));
        
        //Confirm input fields.
        verifyExistence(driver, driver.findElement(By.id("prefixName")));
        verifyExistence(driver, driver.findElement(By.id("subject")));
        verifyExistence(driver, driver.findElement(By.id("data-prefix1")));
        verifyExistence(driver, driver.findElement(By.id("data-pred1")));
        verifyExistence(driver, driver.findElement(By.id("data-1")));
        
        //Confirm UI/Buttons.
        verifyExistence(driver, driver.findElement(By.id("plus")));
        verifyExistence(driver, driver.findElement(By.id("minus")));
        verifyExistence(driver, driver.findElement(By.id("submit")));
        verifyExistence(driver, driver.findElement(By.id("custom-search")));
        verifyExistence(driver, driver.findElement(By.id("bulk-export")));
        
        driver.quit();
	}
	
	@Test
	public void verifyModularUI() throws Exception {
        driver.get(testURL);
       
        //Verify initial state.
        Thread.sleep(200);
        verifyExistence(driver, driver.findElement(By.id("plus")));
        verifyExistence(driver, driver.findElement(By.id("minus")));
        
        //Add a new element set.
        driver.findElement(By.id("plus")).click();
        Thread.sleep(2000);
        
        //Verify the new element set.
        verifyExistence(driver, driver.findElement(By.name("data-prefix2")));
        verifyExistence(driver, driver.findElement(By.name("data-pred2")));
        verifyExistence(driver, driver.findElement(By.name("data-2")));
        
        //Add a new element set.
        driver.findElement(By.id("minus")).click();
        Thread.sleep(2000);
        
        //Verify the original set exists.
        verifyExistence(driver, driver.findElement(By.name("data-prefix1")));
        verifyExistence(driver, driver.findElement(By.name("data-pred1")));
        verifyExistence(driver, driver.findElement(By.name("data-1")));
      
        if(	driver.findElement(By.name("data-prefix2")) != null || 
        	driver.findElement(By.name("data-pred1")) != null || 
        	driver.findElement(By.name("data-1")) != null)
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
	
	@Test
	public void verifyAutocompleteCapabilities() throws Exception {
        //Verify data-level autocomplete.
      	driver.get(testURL);
      	
      	Thread.sleep(200);
        driver.findElement(By.name("data-1")).sendKeys("a");
        Thread.sleep(200);
        driver.findElement(By.className("ui-autocomplete ui-front ui-menu ui-widget ui-widget-content"));
        
        //Verify prefix-level autocomplete.
        driver.get(testURL);
        Thread.sleep(200);
        driver.findElement(By.name("prefixName")).sendKeys("a");
        Thread.sleep(200);
        driver.findElement(By.className("ui-autocomplete ui-front ui-menu ui-widget ui-widget-content"));
        
        driver.quit();
	}
	
	@Test
	public void verifyBulkExporting() throws Exception {
       	//This test is wholly useless but it will at least serve as a warning if the button disappears all of a sudden.
      	driver.get(testURL);
      	
      	Thread.sleep(200);
        driver.findElement(By.name("bulk-export")).click();
        Thread.sleep(2000);
        
        driver.quit();
	}
	
	public void verifyExistence(WebDriver driver, WebElement element) throws InterruptedException {
		Thread.sleep(1000);
	    for (int i = 0; i < 2; i++) {
	        JavascriptExecutor js = (JavascriptExecutor) driver;
	        js.executeScript("arguments[0].setAttribute('style', arguments[1]);",
	                element, "color: yellow; border: 2px solid yellow;");
	    }
	}
}