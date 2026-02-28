import streamlit as st
import pandas as pd
import os
from datetime import datetime

st.set_page_config(
    page_title="AI Animal Intrusion System",
    page_icon="🐘",
    layout="wide"
)

# ---------------- CUSTOM CSS ----------------
st.markdown("""
<style>
body {
    background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
    color: white;
}

.main-title {
    font-size: 42px;
    font-weight: bold;
    text-align: center;
    color: #00f5d4;
}

.sub-title {
    text-align: center;
    color: #adb5bd;
    font-size: 18px;
    margin-bottom: 30px;
}

.metric-card {
    background-color: rgba(255,255,255,0.08);
    padding: 20px;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0px 4px 15px rgba(0,0,0,0.4);
}

.section-title {
    font-size: 24px;
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 15px;
    color: #00f5d4;
}
</style>
""", unsafe_allow_html=True)

# ---------------- HEADER ----------------
st.markdown('<div class="main-title">🐘 AI-Based Animal Intrusion Monitoring</div>', unsafe_allow_html=True)
st.markdown('<div class="sub-title">Real-Time Detection | Image Logging | Smart Analytics</div>', unsafe_allow_html=True)

LOG_FILE = "../alerts_log.csv"

# ---------------- LOAD DATA ----------------
if not os.path.exists(LOG_FILE):
    st.warning("No intrusion data available yet.")
    st.stop()

df = pd.read_csv(LOG_FILE)

if df.empty:
    st.warning("Log file exists but contains no data.")
    st.stop()

df["timestamp"] = pd.to_datetime(df["timestamp"])

# ---------------- SIDEBAR ----------------
st.sidebar.markdown("## 🔎 Filter Detections")

animal_filter = st.sidebar.multiselect(
    "Select Animal Type",
    df["animal"].unique(),
    default=df["animal"].unique()
)

df_filtered = df[df["animal"].isin(animal_filter)]

# ---------------- METRICS ----------------
st.markdown('<div class="section-title">📊 System Overview</div>', unsafe_allow_html=True)

col1, col2, col3 = st.columns(3)

with col1:
    st.markdown('<div class="metric-card">', unsafe_allow_html=True)
    st.metric("Total Intrusions", len(df_filtered))
    st.markdown('</div>', unsafe_allow_html=True)

with col2:
    st.markdown('<div class="metric-card">', unsafe_allow_html=True)
    st.metric("Unique Animals", df_filtered["animal"].nunique())
    st.markdown('</div>', unsafe_allow_html=True)

with col3:
    st.markdown('<div class="metric-card">', unsafe_allow_html=True)
    latest = df_filtered["timestamp"].max()
    st.metric("Latest Detection", latest.strftime("%Y-%m-%d %H:%M") if pd.notnull(latest) else "N/A")
    st.markdown('</div>', unsafe_allow_html=True)

# ---------------- CHARTS ----------------
st.markdown('<div class="section-title">📊 Intrusions by Animal</div>', unsafe_allow_html=True)
animal_counts = df_filtered["animal"].value_counts()
st.bar_chart(animal_counts)

st.markdown('<div class="section-title">📈 Daily Intrusion Trend</div>', unsafe_allow_html=True)
daily_counts = df_filtered.groupby(
    df_filtered["timestamp"].dt.date
).size()
st.line_chart(daily_counts)

# ---------------- TABLE ----------------
st.markdown('<div class="section-title">🗂 Detection Records</div>', unsafe_allow_html=True)
st.dataframe(
    df_filtered.sort_values("timestamp", ascending=False),
    use_container_width=True
)

# ---------------- IMAGE VIEW ----------------
st.markdown('<div class="section-title">🖼 View Detection Image</div>', unsafe_allow_html=True)

selected_row = st.selectbox(
    "Select Detection Record",
    df_filtered.index
)

if selected_row is not None:
    image_path = df_filtered.loc[selected_row, "image_path"]

    if os.path.exists(image_path):
        st.image(image_path, caption="Detected Animal", use_container_width=True)
    else:
        st.error("Image file not found.")

# ---------------- FOOTER ----------------
st.markdown("---")
st.markdown(
    "<center>🚀 AI Wildlife Protection System | Built with Python & Streamlit</center>",
    unsafe_allow_html=True
)