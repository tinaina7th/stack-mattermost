(() => {
  const form = document.getElementById("user-form");
  const status = document.getElementById("status");
  const config = window.MM_ADMIN_USER_UI_CONFIG || {};
  const apiUrl = config.apiUrl;
  const adminToken = config.adminToken;

  const setStatus = (message, tone = "info") => {
    status.textContent = message;
    status.dataset.tone = tone;
  };

  const buildPayload = (formData) => {
    const roles = formData.get("roles").split(",").map((role) => role.trim()).filter(Boolean);
    return {
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
      locale: formData.get("locale"),
      roles: roles.join(" "),
    };
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!apiUrl || !adminToken) {
      setStatus("MM_API_URL または MM_ADMIN_TOKEN が設定されていません。", "error");
      return;
    }

    setStatus("送信中...", "info");
    const formData = new FormData(form);

    try {
      const response = await fetch(`${apiUrl.replace(/\/$/, "")}/api/v4/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(buildPayload(formData)),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message = data.message || `HTTP ${response.status}`;
        setStatus(`作成に失敗しました: ${message}`, "error");
        return;
      }

      setStatus(`ユーザーを作成しました: ${data.username || formData.get("username")}`, "success");
      form.reset();
    } catch (error) {
      setStatus(`通信に失敗しました: ${error.message}`, "error");
    }
  });
})();
