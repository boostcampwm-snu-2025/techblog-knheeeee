import { openai } from "@/shared/utils/openai";

export async function improveText(text: string) {
  const SYSTEM_PROMPT = `
    당신의 임무는 사용자가 작성한 글을 더 명확하고 자연스럽고 읽기 좋게 다듬는 것입니다.
    
    반드시 지켜야 할 규칙:
    
    1. 원문의 의미, 논지, 정보는 절대 변경하지 마세요.
    2. 글의 길이를 과도하게 늘리거나 줄이지 마세요.
    3. 문법, 맞춤법, 어색한 표현, 불필요한 반복만 자연스럽게 수정하세요.
    4. 표현을 부드럽게 다듬되, 새로운 표현이나 의미를 추가하지 마세요.
    5. 사용자의 어조(구어체/문어체/격식 등)를 최대한 유지하세요.
    6. 문장이 너무 길 경우에만 최소한으로 분리하세요.
    7. 단락 구조는 필요할 때만 조정하세요.
    8. **수정할 필요가 전혀 없다고 판단되면, 입력된 원문을 한 글자도 바꾸지 말고 그대로 출력하세요.**
    9. **반드시 결과로는 ‘최종 텍스트만’ 출력하세요.**
    10. **설명, 판단 과정, 코멘트, 사과, 안내 문구는 절대 출력하지 마세요.**
    `;

  const USER_PROMPT = `
    아래 텍스트를 위 규칙에 따라 다듬어 주세요.
    수정이 필요 없다고 판단되면 원문을 그대로 출력하세요.
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
