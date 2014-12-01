import java.net.URL;
import java.util.UUID;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;


public class CustomSearchTests
{
	String baseURL = "http://iie-dev.cs.fiu.edu/";
	String testURL = baseURL + "custom_search.html";
	private WebDriver driver;
	
	@BeforeMethod
    public void setUp() throws Exception {
		
		DesiredCapabilities capabilities = DesiredCapabilities.chrome();
		capabilities.setCapability("version", "35");
        capabilities.setCapability("platform", Platform.XP);
        // Create the connection to Sauce Labs to run the tests
        driver = new RemoteWebDriver(
                new URL("http://lazherrera:a46f025c-0e5c-495a-a403-da422d5c60b0@ondemand.saucelabs.com:80/wd/hub"),
                capabilities);
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
        verifyExistence(driver, driver.findElement(By.id("query")));
        verifyExistence(driver, driver.findElement(By.id("tags")));
        
        //Confirm UI/Buttons.
        verifyExistence(driver, driver.findElement(By.id("add")));
        verifyExistence(driver, driver.findElement(By.id("search")));
        verifyExistence(driver, driver.findElement(By.id("submit")));

	}
	
	@Test
	public void verifyDataStorage() throws Exception {
		driver.get(testURL);
		
		//Generate a random UUID for this test.
		Thread.sleep(200);
		String target = UUID.randomUUID().toString();
		
		//Add a real query to the query location, tag and store it.
		driver.findElement(By.id("query")).clear();
		driver.findElement(By.id("query")).sendKeys("SELECT ?x ?y ?z WHERE { ?x ?y ?z }");
		driver.findElement(By.id("tags")).clear();
		driver.findElement(By.id("tags")).sendKeys(target);
		driver.findElement(By.id("add")).click();
		Thread.sleep(5000);
		
		//Recall the query.
		driver.get(testURL);
		
		Thread.sleep(200);
		driver.findElement(By.id("tags")).clear();
		driver.findElement(By.id("tags")).sendKeys(target);
		driver.findElement(By.id("search")).click();
		Thread.sleep(5000);
		
		//Verify the query's storage.
		if(driver.findElement(By.id("query")).getText().length() == 0)
			throw new Exception("Storage failure for custom queries.");
		
	}
	
	@AfterMethod
	public void tearDown() throws Exception {
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