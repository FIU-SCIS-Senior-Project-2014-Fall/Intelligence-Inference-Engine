package com.saucelabs;

import java.util.List;
import com.saucelabs.common.SauceOnDemandAuthentication;
import com.saucelabs.common.SauceOnDemandSessionIdProvider;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestName;
import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import static org.junit.Assert.assertEquals;

import java.net.URL;

public class DatabaseExplorerTests
{
	String baseURL = "http://iie-dev.cs.fiu.edu/";
	String testURL = baseURL + "database_explorer.html";
	private WebDriver driver;
	
	@Before
    public void setUp() throws Exception {

        DesiredCapabilities capabilities = DesiredCapabilities.chrome();
        capabilities.setCapability("version", "35");
        capabilities.setCapability("platform", Platform.XP);
        this.driver = new RemoteWebDriver(
                new URL("http://lazherrera:a46f025c-0e5c-495a-a403-da422d5c60b0@ondemand.saucelabs.com:80/wd/hub"),
                capabilities);
    }
	
	@Test
	public void verifyRendering(String browser, String version, String os) throws Exception {
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
	    driver.quit();
	}
	
	@After
    public void tearDown() throws Exception {
        driver.quit();
    }
}