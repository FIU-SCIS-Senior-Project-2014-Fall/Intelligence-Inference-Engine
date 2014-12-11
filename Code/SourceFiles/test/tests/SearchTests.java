import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;
import org.testng.annotations.BeforeMethod;

import java.net.URL;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

public class SearchTests {
	String baseURL = "http://iie-dev.cs.fiu.edu/";
	String testURL = baseURL + "search.html";

	private WebDriver driver;

	@BeforeMethod
	public void setUp() throws Exception {

		DesiredCapabilities capabilities = DesiredCapabilities.chrome();
		capabilities.setCapability("version", "35");
		capabilities.setCapability("platform", Platform.XP);
		// Create the connection to Sauce Labs to run the tests
		driver = new RemoteWebDriver(
				new URL(
						"http://lazherrera:a46f025c-0e5c-495a-a403-da422d5c60b0@ondemand.saucelabs.com:80/wd/hub"),
				capabilities);
		driver.manage().window().maximize();
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
	}

	@Test
	public void verifyBasicUILayout() throws Exception {
		driver.get(testURL);

		// Confirm layout.
		Thread.sleep(200);
		verifyExistence(driver,
				driver.findElement(By.className("panel-heading")));
		verifyExistence(driver, driver.findElement(By.className("panel-body")));

		// Confirm input fields.
		verifyExistence(driver, driver.findElement(By.name("prefixName")));
		verifyExistence(driver, driver.findElement(By.name("subject")));
		verifyExistence(driver, driver.findElement(By.name("data-prefix1")));
		verifyExistence(driver, driver.findElement(By.name("data-pred1")));
		verifyExistence(driver, driver.findElement(By.name("data-1")));

		// Confirm UI/Buttons.
		verifyExistence(driver, driver.findElement(By.id("plus")));
		verifyExistence(driver, driver.findElement(By.id("minus")));
		verifyExistence(driver, driver.findElement(By.id("submit")));
		verifyExistence(driver, driver.findElement(By.id("custom-search")));
		verifyExistence(driver, driver.findElement(By.id("bulk-export")));

	}

	@Test
	public void verifyModularUI() throws Exception {
		driver.get(testURL);

		// Verify initial state.
		Thread.sleep(200);
		verifyExistence(driver, driver.findElement(By.id("plus")));
		verifyExistence(driver, driver.findElement(By.id("minus")));

		// Add a new element set.
		driver.findElement(By.id("plus")).click();
		Thread.sleep(5000);

		// Verify the original set exists.
		verifyExistence(driver, driver.findElement(By.name("data-prefix1")));
		verifyExistence(driver, driver.findElement(By.name("data-pred1")));
		verifyExistence(driver, driver.findElement(By.name("data-1")));

		// Verify the new element set.
		verifyExistence(driver, driver.findElement(By.name("data-prefix2")));
		verifyExistence(driver, driver.findElement(By.name("data-pred2")));
		verifyExistence(driver, driver.findElement(By.name("data-2")));

		// Add a new element set.
		driver.findElement(By.id("minus")).click();
		Thread.sleep(5000);

		// Verify the original set exists.
		verifyExistence(driver, driver.findElement(By.name("data-prefix1")));
		verifyExistence(driver, driver.findElement(By.name("data-pred1")));
		verifyExistence(driver, driver.findElement(By.name("data-1")));

		try {
			if (driver.findElement(By.name("data-prefix2")) != null
					|| driver.findElement(By.name("data-pred1")) != null
					|| driver.findElement(By.name("data-1")) != null) {
				throw new Exception("A dynamic UI element was not removed.");
			}
		} catch (Exception e) {
			// A Successful test ends with us in this section.
			// Ending in the try section is a test fail.
		}

		// Add a new element set.
		driver.findElement(By.id("plus")).click();
		Thread.sleep(2000);

		// Verify the new element set is correctly named.
		verifyExistence(driver, driver.findElement(By.name("data-prefix2")));
		verifyExistence(driver, driver.findElement(By.name("data-pred2")));
		verifyExistence(driver, driver.findElement(By.name("data-2")));

	}

	// TODO - Find Solution
	@Test
	public void verifyAutocompleteCapabilities() throws Exception {
		// Verify data-level autocomplete.
		driver.get(testURL);

		Thread.sleep(200);
		driver.findElement(By.name("data-1")).sendKeys("a");
		Thread.sleep(200);
		driver.findElement(By.className("ui-menu-item"));

		// Verify prefix-level autocomplete.
		driver.get(testURL);
		Thread.sleep(200);
		driver.findElement(By.name("prefixName")).sendKeys("a");
		Thread.sleep(200);
		driver.findElement(By.className("ui-menu-item"));

	}

	@Test
	public void verifyBulkExporting() throws Exception {

		// This test is wholly useless but it will at least serve as a warning
		// if the button disappears all of a sudden.
		driver.get(testURL);
		Thread.sleep(200);
		driver.findElement(By.id("bulk-export")).click();
		Thread.sleep(2000);

	}

	@AfterMethod
	public void tearDown() throws Exception {
		driver.quit();
	}

	public void verifyExistence(WebDriver driver, WebElement element)
			throws InterruptedException {
		for (int i = 0; i < 2; i++) {
			JavascriptExecutor js = (JavascriptExecutor) driver;
			js.executeScript(
					"arguments[0].setAttribute('style', arguments[1]);",
					element, "color: yellow; border: 2px solid yellow;");
		}
	}
}