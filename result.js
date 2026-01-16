let answers = JSON.parse(localStorage.getItem("answers"));
const total_x = answers[1].B + answers[2].A + answers[4].A + answers[6].A + answers[7].B + answers[9].B + answers[11].B + answers[13].B + answers[15].A + answers[19].A;
const total_y = answers[0].A + answers[3].B + answers[5].B + answers[8].B + answers[10].B + answers[12].A + answers[14].A + answers[16].B + answers[17].B + answers[18].B;
const maxValue = 50;
const chartSize = 300; 
const xPercent = (total_x / maxValue) * chartSize;
const yPercent = chartSize - (total_y / maxValue) * chartSize;
const point = document.getElementById("point");
point.style.left = `${xPercent}px`;
point.style.top = `${yPercent}px`;

const analysis = document.getElementById("analysis");

if(total_x >= 0 && total_x <= 25 ){
    if(total_y >= 0 && total_y <=25){
        analysis.textContent = `Our hidden area cannot be known
                                to others unless we disclose it. There is
                                that which we freely keep within ourselves,
                                and that which we retain out of fear. The
                                degree to which we share ourselves with
                                others (disclosure) is the degree to which
                                we can be known.`;
    }else{
        analysis.textContent = `The open area is that part of our
                                conscious self - our attitudes, behavior,
                                motivation, values, way of life - of which
                                we are aware and which is known to
                                others. We move within this area with
                                freedom. We are "open books".
                                It is through disclosure and feedback that
                                our open pane is expanded and that we
                                gain access to the potential within us
                                represented by the unknown pane.`;
    }
}else{
    if(total_y >= 0 && total_y <=25){
        analysis.textContent = `There are things about ourselves
                                which we do not know, but that others can
                                see more clearly; or things we imagine to
                                be true of ourselves for a variety of reasons
                                but that others do not see at all. When
                                others say what they see (feedback), in a
                                supportive, responsible way, and we are
                                able to hear it; in that way we are able to
                                test the reality of who we are and are able
                                to grow`;
    }else{
        analysis.textContent = `We are more rich and complex
                                than that which we and others know, but
                                from time to time something happens - is
                                felt, read, heard, dreamed - something from
                                our unconscious is revealed. Then we
                                "know" what we have never "known"
                                before.`;
    }
}



