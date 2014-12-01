import java.net.URL;
import java.util.List;
import java.util.concurrent.TimeUnit;

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

public class DatabaseExplorerTests
{
	String baseURL = "http://iie-dev.cs.fiu.edu/";
	String testURL = baseURL + "database_explorer.html";
	
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
	public void verifyRendering() throws Exception {
	    driver.get(testURL);
	    
	    //Get current data.
	    Thread.sleep(2000);
	    List<WebElement> links = driver.findElements(By.className("link"));
	    List<WebElement> nodes = driver.findElements(By.className("node"));
	    
	    //Verify attributes for links.
	    for (WebElement current : links)
	    {
	    	if(	current.getAttribute("x1") == "0" || current.getAttribute("x2") == "0" || 
	    		current.getAttribute("y2") == "0" || current.getAttribute("y2") == "0")
	    	{
	    		throw new Exception ("Lines being incorrectly rendered.");
	    	}
	    }
	    
	    //Verify attributes for nodes.
	    for (WebElement current : nodes)
	    {
	    	if(	current.getAttribute("transform").equals(""))
	    	{
	    		throw new Exception ("Nodes being incorrectly rendered.");
	    	}
	    }
	}
	@AfterMethod
	public void tearDown() throws Exception {
		driver.quit();
	}
	
}