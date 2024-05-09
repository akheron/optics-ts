import { readFileSync, writeFileSync } from "node:fs";
import { globSync } from "glob";

// 使用 glob 匹配所有的 .md 和 .mdx 文件
const files = globSync("./docs/**/*.{md,mdx}");

files.forEach((file) => {
  const data = readFileSync(file, "utf8");

  const updatedData = data.replace(
    /^(#{1,6}) (.*?)( \{#.*?\})?$/gm,
    (match, p1, p2, p3) => {
      // 如果标题已经包含自定义锚点，不作任何操作
      if (p3) return match;

      const id = p2.toLowerCase().replace(/\s+/g, "-");
      return `${p1} ${p2} {#${id}}`;
    },
  );

  // 将更新后的数据写回文件
  writeFileSync(file, updatedData);
});
