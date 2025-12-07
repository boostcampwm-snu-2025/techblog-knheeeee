import { openai } from "@/shared/utils/openai";

export async function improveText(text: string) {
  const SYSTEM_PROMPT = `
    당신의 임무는 사용자가 작성한 글을 다듬어 더 명확하고 자연스럽고 읽기 좋은 형태로 개선하는 것입니다.

    반드시 지켜야 할 규칙:

    1. 원문의 의미와 논지를 절대 변경하지 마세요.
    2. 글의 길이를 과도하게 늘리거나 줄이지 마세요.
    3. 문법, 맞춤법, 불필요한 반복을 자연스럽게 수정하세요.
    4. 표현을 부드럽고 매끄럽게 다듬되, 과도한 문학적 표현은 피하세요.
    5. 사용자가 쓴 어조(구어체/문어체/친근함/격식 등)를 가능한 한 유지하세요.
    6. 문장이 너무 길다면 적절히 분리하여 가독성을 높여주세요.
    7. 단락 구조를 자연스럽게 조정해 흐름이 매끄럽도록 만들어주세요.
    8. 수정한 부분은 자연스럽게 녹여야 하며, 새 의미 추가는 금지합니다.
    9. 결과는 ‘수정된 텍스트만’ 출력하세요. 설명은 하지 마세요.
    `;

  const USER_PROMPT = `
    아래 문장을 위 규칙에 맞게 다듬어 주세요.
    ---
    ${text}
    ---
    `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: USER_PROMPT },
    ],
  });

  return response.choices[0].message.content;
}
