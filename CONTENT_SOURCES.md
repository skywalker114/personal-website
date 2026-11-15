# Content provenance

Updated 16 November 2026. The GitHub and locally reviewed coursework additions in this revision are prepared for publication at Harry's request, alongside the updated banner and typography.

## Supplied CV

Source: `C:/Harry's personal file/find job/Harry CV.pdf` (one page).

Used for name, professional email, degree titles, universities and dates, employment, toolkit, project roles and outcomes, and Roman art and archaeology research. The attendance project's approximately 40% error reduction and the CTF participation scale are user-reported in the CV, not independently measured in this website task.

The biography and project summaries are newly drafted website copy based on these facts. Note pages are short project introductions; they are not reproductions of the original Roman archaeology articles or a detailed reconstruction of undocumented implementation decisions. No employer-specific technology stack was assigned to an unrelated CV project.

Phone number and permanent-residency details were not added to the website; they do not contribute to the requested personal introduction. The original PDF is not in the public assets. Rendered inspection files are in ignored `tmp/`.

## LinkedIn

https://au.linkedin.com/in/shaoxuan-tang

The public search result matched the CV on name, Gillibrand Pty Ltd, Monash University, 2025–2027, and Melbourne. LinkedIn blocked direct retrieval (HTTP 999); no login was attempted and no additional qualifications or credentials were inferred from reposted content.

The original PDF's LinkedIn and GitHub annotations point to `http://#`, so they were not used as valid destinations.

## GitHub

User explicitly confirmed the account `skywalker114` in this chat.

- Profile: https://github.com/skywalker114
- Public repository inventory: https://api.github.com/users/skywalker114/repos?per_page=100&sort=updated
- C++ practice file tree: https://api.github.com/repos/skywalker114/prac7/git/trees/main?recursive=1
- Public source link used on the site: https://github.com/skywalker114/prac7

The public prac7 tree contains BubbleSort.cpp, QuickSort.cpp, RecursiveBinarySearch.cpp and associated headers. It is presented as C++ coursework, not a production application. The Operating-System default branch contains only README.md; the 15 November review below also inspected its implementation branches. No public repository was verified for the three CV projects, so their case studies have no invented source-code or live-demo links.

## Website experiments

The personal atlas combines CV/profile facts with verified public code and the locally reviewed coursework below: thirteen building points, three work points, two study points, and one Roman archaeology point plus Harry. Connections represent shared categories and interests, rather than undocumented employer/project relationships.

The 3D story projector adds topic words from the already documented skills and research subjects. Coordinates are curated and deterministic; no Word2Vec training, text-embedding request, or t-SNE computation has taken place. Topic words select the relevant existing chapter, rather than implying additional jobs or projects.

The landing page presents only the immersive story space. Biographical material and its education/work anchors are available on `/about/`. Earlier decorative experiments are not represented as historical CV projects. No Hugging Face model demo or AI assistant is claimed to be connected.

## Expanded stories and illustrations

The 20 main points have newly drafted editorial summaries in `src/content/story-details.ts`. Their factual content comes from the CV and reviewed project files. Reflections connecting these chapters are website copy for Harry to review.

The CTF, attendance and VM diagrams are illustrative workflows using sample scores, times and instructions. They are not recordings of the original software, production data or independently measured results. The sorting animation runs a separate browser bubble-sort implementation on five example values; it does not claim to execute the C++ repository. The verified C++ coursework has a new case-study route and retains its real repository link.

## GitHub additions — 15 November 2026

Public repository metadata, file trees and selected source were read through GitHub's public API. Downloaded project code was not executed. Review material is in ignored `tmp/github-review/`.

- `sign-language-classifier`: `UMLT_A3v2.ipynb` contains the 24-class, 28 × 28 Sign Language MNIST experiment using TensorFlow/Keras. Saved outputs report 0.8175 test accuracy for the batch-normalised model and 0.8176 for SELU. These are retained notebook outputs, not independently rerun results. High validation scores are not presented as test accuracy. The MobileNetV3Small extension is unfinished; it has no verified completed evaluation. The SVG uses symbolic image pixels and arbitrary illustrative score bars, not actual model inference. Dataset CSVs and model files were not copied into the website.
- `unix-shell` and `mini-unix-shell`: inspected C process execution, pipelines, redirection and wildcard handling in the former; `cd`, background processes and SIGCHLD handling in the course-scaffold-based mini shell. They share a story rather than two near-duplicate map points.
- `Operating-System`: `Practial-2` (spelling preserved) contains memory-simulation source and traces; inspected C logic includes LRU and Clock while FIFO is a stub. `Practical-3` includes a small threaded TCP-server exercise. No complete operating-system or fully implemented text-analysis engine is claimed.
- `hotel-booking-web-app`: inspected Express routes, browser pages and `Hotel_Booking.sql`. Source includes account sessions, rooms and reservation records. Password handling, booking dates and availability queries need further work, so it is labelled a prototype. The animation is not a live booking service.
- `matlab-sliding-puzzle`: despite its repository name, `puzzle.m` implements a click-based neighbour-update grid puzzle, not a classic sliding-tile solver. `matlab-air-battle` contains sprite, mouse and projectile code with a configured 40 Hz timer; this is not a measured frame rate. They share a creative-coding story with an illustrative browser animation. MATLAB was not run.
- `yyserver-web-backend`: Express/Sequelize/MySQL appointment-management prototype, presented as a secondary About experiment without assigning it to the CV attendance project or an employer.
- `cpp-artificial-pet`: pet-behaviour and rock-paper-scissors tournament exercises, presented as C++ coursework on About.
- `matlab-gomoku` was empty at review time and is omitted.

Public repository links are included directly in the project data. No source credentials, database dumps, compiled bundles or downloaded datasets are included in the exported site. The four new animations illustrate mechanisms using example data, not recordings or executions of these repositories.

## Pac-Man AI — 16 November 2026

Harry requested review of the Codex chat titled `Review Assignment 1 Materials`, then authorised adding this project to the website. Read the relevant chat turns and inspected the current local `skywalker114/README.md`, `solvers/q1a_solver.py`, `solvers/q1b_solver.py`, `solvers/q1c_solver.py`, `agents/q2Agent.py` and framework attribution in `pacman.py`, within the FIT5047 assignment folder. All coursework files were read without modification or execution.

Verified implementation themes: A* navigation, Manhattan and BFS maze-distance heuristics, subset dynamic programming with a greedy fallback for food-route planning, and an alpha-beta agent with move ordering, adaptive depth and selective ghost exploration. The summary acknowledges that selective exploration approximates full minimax. No claims of universal optimality, new benchmark results or verified win rates are added. Historical grading numbers mentioned in chats were not treated as newly verified measurements.

The game framework is provided teaching code from the UC Berkeley Pac-Man AI projects. Its local licence header prohibits publication of solutions. The website therefore contains a high-level project summary with attribution, no private repository link and no solution source or course assets. The public framework-credit link was verified against https://inst.eecs.berkeley.edu/~cs188/fa26/projects/ . Harry's contribution is described as solvers and agent logic rather than creation of the original game.

`src/components/pacman-diagram.tsx` is a newly written schematic with a small original maze, fixed example positions and original SVG shapes. It does not execute the coursework algorithms, reconstruct the submitted solution, copy an assessed layout or present itself as recorded gameplay. The illustration reuses the site's pause, restart, reduced-motion and visibility controls.

## Flatland train scheduling — 16 November 2026

Harry identified `Review assignment files safely` and `Improve leaderboard performance (2)` as one project. Both Codex chats point to the same FIT5222 assignment1 folder. The website represents the complete development and optimisation work with one project record, one map chapter and one case-study route.

Read the relevant chat turns, current coursework README and pyproject, question1.py, question2.py, the active question3.py planning/repair functions and selected supporting functions, plus the final presentation script. Current entry points use a prioritised space-time A* seed, main large-neighbourhood optimisation with bounded A* group repair, conditional fallback and timing sweeps. Replanning preserves executed prefixes and malfunction waits and validates replacement schedules. Older FOCAL-related code remains in the file but is not called by the active entry points; the website does not advertise it as the current main method. The code adapts LNS ideas rather than claiming an exact reproduction of MAPF-LNS2.

Historical server results were checked directly against Harry's retained log at `C:/Users/harry/.codex/attachments/85e004bc-5a8f-48f6-8b82-1281eb32441e/pasted-text.txt`. A read-only audit in ignored `tmp/review-flatland-results.mjs` independently summed all 56 rows: 2,832 agents, 2,827 finished (99.82%), 2,489 deadlines met, maximum 150 agents per case. Five cases each have one unfinished train. The congested `level_6/test_7` finished all 150 but met only 12 deadlines. The website retains these qualifications alongside the completion figure. No new solver evaluation was run. The saved log contains no evaluated commit hash; current file hashes also differ from the historical presentation hash, so these results are explicitly labelled a retained historical server run rather than a benchmark of the current files. The score 50.73/60 is not used as a public performance metric.

The simulator and Piglet scaffold were supplied by the course. Verified the public framework attribution against https://github.com/ShortestPathLab/flatland . The student's private repository is not linked and no solution code, course layouts, grade log, presentation package or renderer assets are copied into the website. The private coursework files were only read.

`src/components/flatland-diagram.tsx` is an original SVG schematic: two trains share a junction, a breakdown extends a reservation, another train waits and revised timings allow movement to resume. Its fixed example timings illustrate coordination and repair, not execution of the actual solver. The same pause/restart, reduced-motion and visibility behaviour applies as for the existing illustrations.

## Bayesian networks and decision analysis — 16 November 2026

Harry requested the next project by its Codex chat title, `Guide assignment learning`. Read relevant turns and the locally saved interview-preparation Markdown for context, then verified claims against the FIT5047 assignment3 `submission` folder: README files for Sections 6–11, the completed Python task implementations, run guide, four tuned-summary JSON files, four evaluation-comparison CSV files, held-out prediction-audit aggregates and the decision-analysis helper. Assignment files, model files and datasets were not changed or executed. Netica was not launched and no new training or evaluation took place.

Verified study structure: four BN structures (nBN, cBN1, supplied eBN, revised cBN2), each with 96 tuning and 24 reserved test cases. The run guide uses Netica's EM learning through the supplied wrapper; the student's workflow implements preprocessing, inference, selected-CPT/threshold simulated annealing and evaluation. A decision network extends tuned cBN1 and explores expected utility under assignment-specific assumptions. The student does not claim to have implemented Netica's inference or EM engine from scratch or authored the supplied expert graph and wrapper.

The read-only audit in ignored `tmp/review-bayesian-results.mjs` checked saved summaries and aggregate predictions for all four tuned models: 24 NoAlert predictions, 10 errors, zero correct Investigate predictions out of 10 actual Investigate cases. Evaluation CSVs report error 0.416666667 and tuned log losses 0.684523349 (nBN), 0.680098414 (cBN1), 0.683156458 (eBN), 0.685317023 (cBN2), each below its learned-model value. The website presents the class-level limitation with the 58.33% accuracy, rather than implying successful signal detection or general model superiority. The small hold-out set is not evidence of broad generalisation.

The coursework uses synthetic vaccine-safety data. Public copy remains at that high level; it does not reproduce product/diagnosis pair details, records, identifiers, assessed network structures, source code, Netica DLLs or licence configuration. It explicitly describes an educational modelling study with no clinical validation or established causal findings. Utilities are modelling assumptions, not medical recommendations. Verified the software-credit link against https://www.norsys.com/netica.html .

`src/components/bayesian-diagram.tsx` is an original generic evidence/belief graph and option-ranking schematic. Its arbitrary visual values demonstrate how a different utility assumption can change a preferred option. It neither reproduces a submitted network nor performs Netica inference, uses case results or makes a health recommendation. It uses the existing pause/restart, visibility and reduced-motion behaviour.

## WEKA model evaluation — 16 November 2026

Harry requested the next project using the Codex chat title `Review assessment requirements`. The chat covers FIT5047 assignment4: WEKA classification on the supplied 699-record Breast dataset and 86-record Postoperative dataset, nominal/ordinal representation comparisons and linear regression on a 21-record economic series. This is a separate project from the earlier Bayesian-network assignment.

Verified the main claims using saved files in `assignment4/submition`: Q1_11_IBk_K3_10FoldCV_Results.txt and Q1_12_IBk_K5_10FoldCV_Results.txt both show 677/699 correct under ten-fold CV. Their confusion matrices are [[446,12],[10,231]] and [[444,14],[8,233]], respectively. This supports equal accuracy with different class errors, not dominance of one setting on every measure. Q2_03_Representation_and_Encoding_Notes.md and Q2_19_IBk_Comparison.md describe the ordinal mapping, equal-spacing assumption, scaling, changed neighbours and lack of consistent performance improvement. Public copy does not include individual supplied cases or decision recommendations.

Q3_02_LinearRegression_Chronological_WithYear_Results.txt records 15 training instances, a six-instance test set, MAE 3.8321 and RMSE 5.1295. Q3_05_LinearRegression_10FoldCV_Results.txt records 21 complete instances with random ten-fold CV, MAE 0.9246 and RMSE 1.1705. Q3_06_CrossValidation_Comparison.md confirms the 1986–2000 / 2001–2006 split and unemployment-percentage-point units. The article preserves the distinction between protocols and different training sizes, and notes the small sample. It does not equate the displayed full-data regression equation with the fold-specific models or claim a causal effect from coefficients.

The work is described as experiment design, data preparation, calculations and interpretation using WEKA, rather than implementation of its algorithms from scratch. Verified the Weka Workbench credit at https://ml.cms.waikato.ac.nz/weka/ . Four model families are J48, naive Bayes, k-NN and linear regression. No new WEKA run, diagnosis or forecast was performed; assignment files were only read. The private report, supplied datasets, patient records and original GUI images are not exported with the site. The study has no clinical validation or deployed forecasting service.

`src/components/evaluation-diagram.tsx` shows original example partitions contrasting mixed years with an earlier-training/later-testing split. Blocks are conceptual and do not encode actual case rows, exact folds or the real 15/6 split. Saved numerical results remain in the story. Existing animation playback, reduced-motion and visibility handling apply.

## DINOv3 image classification — 16 November 2026

Harry requested the complete project behind `Create report and notebook`, covering the Codex projects labelled `assignment1 dp2` and `assignment for dp`. The app's project inventory confirms these are the FIT5215 assignment1/rework folder and its parent assignment1 workspace. They are represented as one project, separate from the existing Sign Language MNIST study.

Reviewed relevant turns from `Create report and notebook`, `Optimize FIT5215 Kaggle model` and `Review assignment progress`; selected original and rework notebooks; the local GitHub-release README/notebook; domain-shift summary; Round 10/11 configs; later round metadata; and saved output traces. The read-only audit in ignored `tmp/review-deep-learning.mjs` parses notebook JSON and text metadata without executing notebooks, loading checkpoints or running training. Large feature/model/dataset files were not copied or loaded. No original assignment files were modified.

The original workspace records broad CNN/transformer, DINOv2, Perception Encoder, restoration and domain-adaptation experimentation. The final reported system is the later frozen DINOv3 ViT-H+/16 pipeline, not an ensemble of every investigated model. Verified 2,560-dimensional global-plus-mean-patch features; 9,466 labelled and 11,681 unlabelled images; three inference views; agreement/confidence/margin-gated pseudo-label selection; class caps and low pseudo-label loss weighting; symmetric augmentation; and selected MLP/linear probabilities with zero prototype weight. Round 11 selected 5,145 pseudo-labelled images. The final blend is 0.80625 MLP / 0.19375 linear for seed 917503.

Best retained Kaggle score is 0.96328, explicitly confirmed by Harry in the report chat and recorded in the public project. Course placing 20/393 is Harry's report, also included in his public README; no independent course leaderboard was accessed. Earlier H+ three-view score 0.93788 and selected winner 0.96328 differ by 2.54 percentage points. The same-trained-head prototype/weight comparison records 0.95912 to 0.96211 (a combined inference change, not proof of an isolated component's causal effect); Round 10 to Round 11 records 0.96318 to 0.96328. The older 99.86% validation result belongs to the earlier 8,047/1,419 split. The final all-labelled-data round has no independent held-out validation score. The article preserves these boundaries and warns that repeated leaderboard selection limits generalisation claims. Local candidate-priority scores are not accuracy estimates.

Current Round 12 and Round 13–15 notebooks do contain saved execution outputs; older chat statements describing later rounds as unexecuted are stale. Reviewed later metadata and outputs still name the verified Round 11 score as 0.96328. No higher confirmed competition result was found. The case study therefore describes later exploration without promoting a later candidate to the reported winner.

The selected notebook's genuine saved outputs show linear weighted losses 0.163278 then 0.162407, and MLP weighted losses 0.159534 then 0.159788 across two continuation epochs. These four values are presented directly in a table, with the nearly flat MLP loss acknowledged. No new training was performed and no curve or result was fabricated. The notebook reruns the final round from a parent checkpoint; it does not reproduce every prior experiment from scratch without additional artifacts.

Verified the public repository through GitHub's API: https://github.com/skywalker114/dinov3-image-classification . Its root contains README.md, best_model.ipynb and requirements.txt. The public README independently matches the local release description and recorded result. Source and notebook links on the site target these verified public files. Verified Meta's pretrained model credit at https://huggingface.co/facebook/dinov3-vith16plus-pretrain-lvd1689m . No gated weights or third-party model assets were downloaded. The website does not export course data, checkpoints, caches, credentials, private chat messages or student identifiers. The machine-learning toolkit now includes tools verified across the reviewed projects.

`src/components/vision-diagram.tsx` is an original schematic: three illustrative image views, a frozen encoder, the recorded head-blend weights, class outputs and gated pseudo-label feedback. Its image/class highlight is illustrative and runs no model. The richer case study adds an editorial development timeline and saved training table; the homepage stays an immersive map without permanent cards.
