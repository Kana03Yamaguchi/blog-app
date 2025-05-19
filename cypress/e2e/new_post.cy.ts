//  TypeScript に「このファイルでは Cypress の型を使う」と伝える構文
/// <reference types="cypress" />

describe("記事投稿フロー", () => {
  it("タイトルと本文を入力して投稿できる", () => {
    // 投稿ページにアクセス
    cy.visit("/posts/new");

    // タイトルと本文を入力して、それぞれ確認
    cy.get("input[type='text']")
      .type("Cypressからの投稿タイトル")
      .should("have.value", "Cypressからの投稿タイトル");

    cy.get("textarea")
      .type("これはCypressによって自動投稿された本文です")
      .should("have.value", "これはCypressによって自動投稿された本文です");

    // APIリクエストのインターセプト（投稿が送信されることを確認）
    cy.intercept("POST", "/api/posts").as("postRequest");

    // 投稿ボタンを取得後にクリック
    cy.get("form").submit();

    // 投稿後の画面（一覧ページ）に遷移したことを確認
    cy.url({ timeout: 10000 }).should("eq", "http://localhost:5173/");

    // 投稿タイトルが表示されるまで最大10秒待つ
    cy.contains("Cypressからの投稿タイトル", { timeout: 10000 }).should(
      "exist"
    );

    // APIリクエストが正常に送信されたことを確認
    cy.wait("@postRequest").its("response.statusCode").should("eq", 201);
  });
});
