describe("Task is not done", () => {
	it("base example, visually looks correct", async () => {
		// APIs from jest-puppeteer
		await page.goto(
			"http://localhost:9010/iframe.html?id=todolist-task--task-redux-story&viewMode=story",
			{ waitUntil: "networkidle2" }
		);

		const image = await page.screenshot();

		// API from jest-image-snapshot
		expect(image).toMatchImageSnapshot();
	});
});
