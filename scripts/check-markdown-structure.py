#!/usr/bin/env python3

import argparse
import re
from pathlib import Path


HEADING_RE = re.compile(r"^(#{1,6})\s+(.+?)\s*$")


def validate_h1_structure(headings: list[tuple[int, int]]) -> list[tuple[str, str]]:
    issues: list[tuple[str, str]] = []
    if headings and headings[0][1] > 2:
        issues.append(
            ("first_heading_deep", f"첫 헤더가 H{headings[0][1]} (line {headings[0][0]})")
        )

    h1_headings = [item for item in headings if item[1] == 1]
    if len(h1_headings) > 1:
        issue_lines = ", ".join(str(item[0]) for item in h1_headings)
        issues.append(
            ("multiple_h1", f"H1이 여러 개 ({len(h1_headings)}개) line {issue_lines}")
        )
    return issues


def validate_heading_jumps(headings: list[tuple[int, int]]) -> list[tuple[str, str]]:
    issues: list[tuple[str, str]] = []
    for prev, curr in zip(headings, headings[1:]):
        if curr[1] > prev[1] + 1:
            issues.append(
                (
                    "heading_jump",
                    f"H{prev[1]} -> H{curr[1]} 점프 (line {prev[0]} -> {curr[0]})",
                )
            )
    return issues


def validate_markdown_structure(
    lines: list[str], headings: list[tuple[int, int]]
) -> list[tuple[str, str]]:
    issues: list[tuple[str, str]] = []
    fence_count = sum(1 for line in lines if line.lstrip().startswith("```"))
    if fence_count % 2 == 1:
        issues.append(("fence_unbalanced", "홀수 개수의 ``` 펜스(닫힘 누락 가능)"))

    issues.extend(validate_h1_structure(headings))
    issues.extend(validate_heading_jumps(headings))

    return issues


def scan_file(path: Path) -> list[tuple[str, str]]:
    lines = path.read_text(encoding="utf-8", errors="replace").splitlines()
    headings: list[tuple[int, int]] = []
    in_fence = False
    for line_no, line in enumerate(lines, start=1):
        if line.lstrip().startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue

        match = HEADING_RE.match(line)
        if match:
            headings.append((line_no, len(match.group(1))))

    return validate_markdown_structure(lines, headings)


def iter_markdown_files(root: Path) -> list[Path]:
    return sorted(path for path in root.rglob("*.md") if ".git" not in path.parts)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="마크다운 헤더 레벨/구조 이상을 점검합니다."
    )
    parser.add_argument(
        "root",
        nargs="?",
        default="docs/wiki",
        help="스캔할 루트 디렉터리 (기본값: docs/wiki)",
    )
    args = parser.parse_args()

    root = Path(args.root)
    if not root.exists():
        print(f"ROOT_NOT_FOUND {root}")
        return 1

    files = iter_markdown_files(root)
    all_issues: list[tuple[str, str, str]] = []
    for file_path in files:
        for kind, message in scan_file(file_path):
            all_issues.append((str(file_path), kind, message))

    print(f"FILES_SCANNED {len(files)}")
    if not all_issues:
        print("NO_ISSUES_FOUND")
        return 0

    counts: dict[str, int] = {}
    for _, kind, _ in all_issues:
        counts[kind] = counts.get(kind, 0) + 1

    print("ISSUE_COUNTS")
    for kind in sorted(counts):
        print(f"- {kind}: {counts[kind]}")

    print("DETAILS")
    for file_path, kind, message in all_issues:
        print(f"{file_path}\t{kind}\t{message}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
