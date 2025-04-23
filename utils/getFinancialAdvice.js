// utils/getFinancialAdvice.js
import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// Function to fetch user-specific data (mocked for this example)

// Function to generate personalized financial advice
const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend) => {
  console.log(totalBudget, totalIncome, totalSpend);
  try {
    const userPrompt = `
      Based on the following financial data:
      - Total Budget: ${totalBudget} USD 
      - Expenses: ${totalSpend} USD 
      - Incomes: ${totalIncome} USD
      Provide detailed financial advice in 2 sentence to help the user manage their finances more effectively.
    `;

    // Send the prompt to the OpenAI API
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: userPrompt }],
    });

    // Process and return the response
    const advice = chatCompletion.choices[0].message.content;

    console.log(advice);
    return advice;
  } catch (error) {
    console.error("Error fetching financial advice:", error);
    
    // Generate fallback advice based on the financial data
    const savingsRate = ((totalIncome - totalSpend) / totalIncome) * 100;
    let fallbackAdvice = "";
    
    if (savingsRate > 20) {
      fallbackAdvice = "Great job! You're saving more than 20% of your income. Consider investing some of your savings for long-term growth.";
    } else if (savingsRate > 0) {
      fallbackAdvice = "You're saving some money, which is good. Try to increase your savings rate by cutting unnecessary expenses.";
    } else {
      fallbackAdvice = "You're spending more than you earn. Consider reviewing your expenses and creating a stricter budget.";
    }
    
    return fallbackAdvice;
  }
};

export default getFinancialAdvice;
