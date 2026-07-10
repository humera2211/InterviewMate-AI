export function parseLeetCode() {
  const titleElement = document.querySelector(".text-title-large");


  const difficultyElement = Array.from(document.querySelectorAll("div")).find(
    (element) => {
      const text = element.textContent?.trim();

      return text === "Easy" || text === "Medium" || text === "Hard";
    },
  );

  const statementElement = document.querySelector(
    '[data-track-load="description_content"]',
  );

  return {
    platform: "LeetCode",

    title: titleElement ? titleElement.textContent.trim() : null,

    statement: statementElement?.innerText.trim() ?? null,

    difficulty: difficultyElement ? difficultyElement.textContent.trim() : null,

    url: window.location.href,
  };
}
