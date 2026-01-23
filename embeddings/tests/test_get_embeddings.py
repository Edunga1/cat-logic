import os
import sqlite3
import sys
import tempfile
from unittest.mock import patch

import pandas as pd
import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src"))

from get_embeddings import load_embeddings, main


@pytest.fixture
def test_docs_path():
    return os.path.join(os.path.dirname(__file__), "test-docs")


@pytest.fixture
def temp_db():
    """빈 DB 파일 생성"""
    with tempfile.NamedTemporaryFile(suffix=".db", delete=False) as f:
        db_path = f.name

    # 빈 테이블 생성
    conn = sqlite3.connect(db_path)
    empty_df = pd.DataFrame(columns=["filename", "text", "checksum", "embedding"])
    empty_df.to_sql("docs", conn, if_exists="replace", index=False)
    conn.close()

    yield db_path

    # cleanup
    os.unlink(db_path)
    csv_path = db_path.replace(".db", ".csv")
    if os.path.exists(csv_path):
        os.unlink(csv_path)


def test_main_creates_embeddings_for_new_docs(test_docs_path, temp_db):
    """새 문서들에 대해 embedding을 생성하고 DB에 저장한다"""
    fake_embedding = [0.1] * 3072
    output_path = temp_db.replace(".db", "")

    with (
        patch("get_embeddings.AzureOpenAIEmbedder") as mock_embedder,
        patch("get_embeddings.get_azure_api_key", return_value="fake-key"),
        patch("get_embeddings.sleep"),
    ):
        mock_embedder.return_value.get_embedding.return_value = fake_embedding

        main(test_docs_path, temp_db, output_path)

    df_loaded = load_embeddings(temp_db)
    assert len(df_loaded) == 2
    assert set(df_loaded["filename"].tolist()) == {"python.md", "javascript.md"}
    assert df_loaded["embedding"].iloc[0] == fake_embedding
