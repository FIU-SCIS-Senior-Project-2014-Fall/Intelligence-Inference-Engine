package testcases;

import static org.testng.AssertJUnit.assertTrue;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.annotations.Test;

public class SearchDatabase extends BaseTestCase 
{	
	@Test
	public void verifyModularAdd() throws InterruptedException
	{
		driver.get(path + "search.html");
		WebElement addButton = driver.findElement(By.id("plus"));
		highlightElement(driver, addButton, "red");
		addButton.click();
		
		Thread.sleep(3000);
		
		WebElement prefix = driver.findElement(By.name("data-prefix2"));
		highlightElement(driver, prefix, "red");
		
		Thread.sleep(1000);
		
		WebElement predicate = driver.findElement(By.name("data-pred2"));
		highlightElement(driver, predicate, "red");
		
		Thread.sleep(1000);
		
		WebElement subject = driver.findElement(By.name("data-2"));
		highlightElement(driver, subject, "red");
		
		Thread.sleep(1000);
	}
	
}
