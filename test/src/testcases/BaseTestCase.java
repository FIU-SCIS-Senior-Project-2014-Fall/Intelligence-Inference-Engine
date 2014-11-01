package testcases;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;

public class BaseTestCase {
	
	WebDriver driver;
	String path;
	
	@BeforeTest
	public void setup()
	{
		driver = new FirefoxDriver();
		path = "http://iie-dev.cs.fiu.edu/";
	}
	
	@AfterTest
	public void tearDown()
	{
		driver.quit();
	}
	
	//click handler;
	public void xClick(WebDriver driver, WebElement element)
	{
		highlightElement(driver, element, "blue");
		element.click();
	}
	
	//highlight element.
	public void highlightElement(WebDriver driver, WebElement element, String tar) 
	{ 
		for (int i = 0; i < 2; i++) 
		{ 
			JavascriptExecutor js = (JavascriptExecutor) driver; 
			js.executeScript("arguments[0].setAttribute('style', arguments[1]);", element, "border: 2px solid "+ tar +";"); 
			//js.executeScript("arguments[0].setAttribute('style', arguments[1]);", element, ""); 
		} 
	}
}